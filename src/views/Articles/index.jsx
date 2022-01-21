import { Card, Button , Table, Tag, Modal, message} from "antd";
import {getArticlesApi, delArticleApi} from '../../server/articles'
import { useState, useEffect } from 'react';
import {HashRouter as Router,Link} from 'react-router-dom'

function Articles(){
    const [pageData, setPageData] = useState({
        page: 1,
        pageSize: 5,
        total: 0,
        dataSource: []
    })
    const [modalDel, setModalDel] = useState(false)
    const [id, setId] = useState(0)

    useEffect(()=>{
        initData(pageData.page, pageData.pageSize)
    },[])
    
    const columns = [
        {
          title: '文章id',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title'
        },
        {
          title: '分类',
          dataIndex: 'category_name',
          key: 'category_name',
        },
        {
          title: '标签',
          key: 'tag_name_list',
          dataIndex: 'tag_name_list',
          render: tag_name_list => (
            <>
              {tag_name_list.map(tag => {
                return (
                  <Tag color='blue' key={tag}>
                    {tag}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: '添加时间',
          dataIndex: 'add_time',
          key: 'add_time',
          render: (time)=>{
              let newTime = time.split('T')[0]
              return( <p>{newTime}</p> )
          }
        },
        {
            title: '操作',
            render: (text) => (<div>
                <Button style={{marginRight: "10px"}}  size='middle' ><Link to={`/admin/editArticle/${text.id}`}>编辑</Link></Button>
                <Button size='middle' onClick={()=>del(text)} danger >删除</Button>
            </div>) ,
            align: 'center'
        }
      ];
    
    function initData(page,pageSize){

        getArticlesApi(page,pageSize).then(res=>{
            if(res.code === 200){
                // 循环处理一下tag，把tag转为数组
                res.list.map((item)=>{
                    item.tag_list = item.tag_list.split(',')
                    item.tag_name_list = item.tag_name_list.split(',')
                })
                setPageData({...pageData, dataSource: res.list, total: res.total})
            }
        })
    }
  
    function onChangeTable(pageinfo){
      setPageData({...pageData, page: pageinfo.current})
      initData(pageinfo.current,pageinfo.pageSize)
    }

    function del(text){
      setModalDel(true)
      setId(text.id)
    }
    function delModelOk(){
      console.log(pageData)
      return;
      delArticleApi(id).then(res=>{
          if(res.code === 200){
              initData(pageData.page, pageData.pageSize)
              message.success('删除成功')
              delModelCancel()
          }
      })
    }
    function delModelCancel(){
      setModalDel(false)
      setId(0)
    }

    return (
        <Router>
            <Card title='文章管理' extra={<Button type='primary'  size='middle'><Link to='/admin/addArticle'>添加文章</Link></Button>}>
                <Table columns={columns} 
                    dataSource={pageData.dataSource} 
                    pagination={ {total: pageData.total, pageSize: pageData.pageSize} }
                    onChange={onChangeTable}
                />
                <Modal title='提示' visible={modalDel} onOk={delModelOk} onCancel={delModelCancel}>
                  <p>确认删除此文章吗？</p>
                </Modal>
            </Card>
        </Router>
    )

}

export default Articles