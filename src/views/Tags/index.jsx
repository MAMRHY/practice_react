import React from 'react'
import { Card, Table, Button, Modal, Form ,Input, message, Alert} from 'antd';
import { useState, useEffect } from 'react';
import { getTagsApi, addTagsApi, editTagsApi, delTagsApi } from '../../server/tag'


export default function Tag (){
    const [dataSource,setDataSource] = useState([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)
    const [ModalVisible, setModalVisible] = useState(false)
    const [modalDel, setModalDel] = useState(false)
    const [info, setInfo] = useState({id: 0,tag_name: ''})
    const [title, setTitle] = useState('添加标签')
    useEffect(()=>{
        initData(page, pageSize)
    },[])

    useEffect(() => {
        if (info.id  > 0  ){
            setTitle('编辑标签')
        } else {
            setTitle('添加标签')
        }
    })

    function initData(page, pageSize){
        getTagsApi(page, pageSize).then(res=>{
            if(res.code === 200){
                setDataSource(res.list)
                setTotal(res.total)
            }else{
                message.error(res.code)
            }
        })
    }

    const addFormRef = React.createRef()
    const columns = [
        {
            title: '标签ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 150
        },
        {
            title: '标签名',
            dataIndex: 'tag_name',
            align: 'center',
            width: 300
        },
        {
            title: '操作',
            render: (text) => (<div>
                <Button style={{marginRight: "10px"}} onClick={()=>handelEdit(text)} size='middle' >编辑</Button>
                <Button size='middle' onClick={()=>del(text)} danger >删除</Button>
            </div>) ,
            align: 'center'
        }
        ];
    function openAddModel(){
        setModalVisible(true)
    }
    function handelEdit(text){
        setInfo({id: text.id, tag_name: text.tag_name})
        openAddModel()
    }
    function addHandleOk(){
        let name = addFormRef.current.getFieldsValue()['tag_name']
        if( name !== ''){
            if(info.id > 0){  //编辑
                editSure(info.id, addFormRef.current.getFieldsValue()['tag_name'])
            }else{ //添加
                addTagsApi(name).then(res=>{
                    if(res.id){
                        message.success('添加成功')
                        setModalVisible(false)
                        initData(page, pageSize)
                    }else{
                        message.error('添加失败请稍后再试。')
                    }
                })
            }
        }

    }
    function editSure(id, name){
        editTagsApi(id, name).then(res=>{
            if(res.code === 200){
                initData(page, pageSize)
                message.success('编辑成功')
                addHandleCancel()
            }
        })
    }
    function addHandleCancel(){
        setModalVisible(false)
        setInfo({id: 0, tag_name: ''})
    }
    function onChangeTable(pageinfo){
        initData(pageinfo.current,pageinfo.pageSize)
        setPage(pageinfo.current)
        setPageSize(pageinfo.pageSize)
    }
    function del(text){
        setModalDel(true)
        setInfo({id:text.id})
    }
    function delModelOk(){
        delTagsApi(info.id).then(res=>{
            if(res.code === 200){
                initData(page, pageSize)
                message.success('删除成功')
                delModelCancel()
            }
        })
    }
    function delModelCancel(){
        setModalDel(false)
        setInfo({id: 0})
    }
    return (
        <Card title='标签管理' extra={<Button type='primary' onClick={openAddModel} size='middle'>添加标签</Button>}>
            <Alert message="不要轻易删除标签，删除标签前请确保这个标签下已经没有文章！" type="warning" showIcon closable />
            {/* <Input.Search placeholder="分类名/分类ID" style={{ width: 400,marginBottom: '20px' }} /> */}
            <Table columns={columns} 
            rowKey='id' 
            bordered={true}
            dataSource={dataSource}
            pagination={ {total: total, pageSize: pageSize} }
            onChange={onChangeTable}
            >
            </Table>
            <Modal title={title} visible={ModalVisible} 
                onOk={addHandleOk} onCancel={addHandleCancel}
              >
                  <Form
                    ref={addFormRef}
                    name="form"
                  >
                     <Form.Item
                      label="标签名"
                      name="tag_name"
                      rules={[
                        {
                          required: true,
                          message: '请输入标签名!',
                        },
                      ]}
                    >
                      <Input placeholder={info.tag_name}  />
                    </Form.Item>
                 </Form>
            </Modal>
            <Modal title='提示' visible={modalDel} onOk={delModelOk} onCancel={delModelCancel}>
                <p>确认删除此分类吗？</p>
            </Modal>
           
        </Card>
    )
    
}