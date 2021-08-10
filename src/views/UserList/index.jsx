import React from 'react'
import 'antd/dist/antd.css'
import {getUsersApi, addUserApi, editUserApi, delUserApi} from '../../server/users'

import { Card, Table, Button, Modal, Form ,Input, message} from 'antd';


export default class UserList extends React.Component{
    constructor(){
        super()
        this.initData('',this.state.page,this.state.pageSize)
    }
    formRef = React.createRef()
    state = {
      userList: [],  //用户列表数据
      isModalVisible: false,
      modalDel: false,   //删除的确认框
      title: '添加',
      id: '',
      username: '',
      password: '',
      page: 1,
      pageSize: 3,
      total: 0,
    }
    initData(search,page,pageSize){
      getUsersApi(search,page,pageSize)
        .then((res) => {
          console.log('res',res);
          if(res.code == 200){
            this.setState({
              userList: res.list,
              total: res.total
            })
          }
        })
        .catch( (error) =>{
          console.log(error);
        });
    }
    columns = [
      {
        title: '用户ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center'
      },
      {
        title: '用户名',
        dataIndex: 'name',
        align: 'center'
      },
      {
        title: '密码',
        dataIndex: 'psw',
        align: 'center'
      },
      {
        title: '操作',
        render: (text) => (<div>
          <Button style={{marginRight: "10px"}}  size='middle' onClick={()=>this.openModel(text)}>编辑</Button>
          <Button size='middle' danger onClick={()=>this.delete(text.id)}>删除</Button>
        </div>) ,
        align: 'center'
      }
    ];
    delete=(id)=>{
      this.setState({
        id,
        modalDel: true
      })
    }
    handleOk=()=>{
      if(this.state.title === '添加'){
        this.add()
      }else{
        this.edit()
      }
    }
    handleCancel= ()=>{
      this.setState({
        isModalVisible: false,
      })
    }
    handelName= (e)=>{
      this.setState({
        username: e.target.value
      })
    }
    handelPsw =(e)=>{
      this.setState({
        password: e.target.value
      })
    }
    openModel=(text)=>{
      this.setState({
        isModalVisible: true
      }, () => {
        if (text.id) {
          this.setState({
            title: '编辑',
            id: text.id
          })
          this.formRef.current.setFieldsValue({
            username: text.name,
            password: text.psw
          })
        } else {
          this.formRef.current.setFieldsValue({
            username: '',
            password: '',
          })
        }
      })
    }
    add = ()=>{
      let name = this.formRef.current.getFieldsValue().username
      let psw = this.formRef.current.getFieldsValue().password
      addUserApi(name, psw).then((res)=>{
        console.log(res);
        if(res.code === 200 ){
          message.success('添加成功')
          this.initData()
        }
        this.setState({
          isModalVisible: false
        })
      }).catch((err)=>{
        console.log(err);
      })
    }
    edit = ()=>{
      console.log('ff', this.formRef.current.getFieldsValue());
      editUserApi(
        this.state.id, 
        this.formRef.current.getFieldsValue().username,
        this.formRef.current.getFieldsValue().password
        ).then((res)=>{
          if(res.code === 200){
            message.success('编辑成功！')
            this.initData()
          }else{
            message.success('编辑失败，稍后再试！')
          }
          this.setState({
            isModalVisible: false
          })
        }).catch(err=>{
          console.log(err);
        })

    }

    comfirDel = ()=>{
      delUserApi(this.state.id).then(res=>{
        if(res.code === 200){
          message.success('删除成功！')
          this.initData()
          this.setState({
            modalDel: false
          })

        }
      }).catch(err=>{
        console.log('err', err);
      })
      // console.log(this.state.id);
    }
    delCancel = ()=>{
      this.setState({
        modalDel: false
      })

    }
    onSearch =(search)=>{
      this.initData(search,this.state.page,this.state.pageSize)
    }

    onChange = (pageinfo)=>{
      this.initData('',pageinfo.current,pageinfo.pageSize)
    }
    
      
    render(){
        return (
           <Card title='用户列表' extra={<Button type='primary' onClick={this.openModel} size='middle'>添加用户</Button>}>
              <Input.Search placeholder="用户名/用户ID" onSearch={this.onSearch} style={{ width: 400,marginBottom: '20px' }} />
              <Table columns={this.columns} 
                rowKey='id' dataSource={this.state.userList} 
                bordered={true}
                pagination={ {total: this.state.total, pageSize: this.state.pageSize} }
                onChange={this.onChange}
              >
              </Table>
              <Modal title={this.state.title+'用户'} visible={this.state.isModalVisible} 
                onOk={this.handleOk} onCancel={this.handleCancel}
              >
                  <Form
                    ref={this.formRef}
                    name="form"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    onFinish={this.onFinish}
                  >
                     <Form.Item
                      label="用户名"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: '请输入用户名!',
                        },
                      ]}
                    >
                      <Input onChange={this.handelName} />
                    </Form.Item>
                    <Form.Item
                      label="密码"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: '请输入密码!',
                        },
                      ]}
                    >
                      <Input.Password onChange={this.handelPsw} />
                    </Form.Item>
                 </Form>
              </Modal>
              
              <Modal title='提示' visible={this.state.modalDel} onOk={this.comfirDel} onCancel={this.delCancel}>
                  <p>确认删除此用户吗？</p>
              </Modal>
           </Card>
        )
    }
}