import React from 'react'
import { Card, Table, Button, Modal, Form ,Input, message} from 'antd';
import { useState, useEffect } from 'react';
import { getClassifyApi, addClassifyApi, editClassifyApi, delClassifyApi } from '../../server/classify'


export default function Classify (){
    const [dataSource,setDataSource] = useState([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)
    const [ModalVisible, setModalVisible] = useState(false)
    const [modalDel, setModalDel] = useState(false)
    const [info, setInfo] = useState({id: 0,category_name: ''})
    const [title, setTitle] = useState('添加分类')
    useEffect(()=>{
        initData(page, pageSize)
    },[])

    useEffect(() => {
        if (info.id  > 0  ){
            setTitle('编辑分类')
        } else {
            setTitle('添加分类')
        }
    })

    function initData(page, pageSize){
        getClassifyApi(page, pageSize).then(res=>{
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
            title: '分类ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 150
        },
        {
            title: '分类名',
            dataIndex: 'category_name',
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
        setInfo({id: text.id, category_name: text.category_name})
        openAddModel()
    }
    function addHandleOk(){
        let name = addFormRef.current.getFieldsValue()['category_name']
        if( name !== ''){
            if(info.id > 0){  //编辑
                editSure(info.id, addFormRef.current.getFieldsValue()['category_name'])
            }else{ //添加
                addClassifyApi(name).then(res=>{
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
        editClassifyApi(id, name).then(res=>{
            if(res.code === 200){
                initData(page, pageSize)
                message.success('编辑成功')
                addHandleCancel()
            }
        })
    }
    function addHandleCancel(){
        setModalVisible(false)
        setInfo({id: 0, category_name: ''})
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
        delClassifyApi(info.id).then(res=>{
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
        <Card title='分类管理' extra={<Button type='primary' onClick={openAddModel} size='middle'>添加分类</Button>}>
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
                      label="分类名"
                      name="category_name"
                      rules={[
                        {
                          required: true,
                          message: '请输入分类名!',
                        },
                      ]}
                    >
                      <Input placeholder={info.category_name}  />
                    </Form.Item>
                 </Form>
            </Modal>
            <Modal title='提示' visible={modalDel} onOk={delModelOk} onCancel={delModelCancel}>
                <p>确认删除此分类吗？</p>
            </Modal>
           
        </Card>
    )
    
}