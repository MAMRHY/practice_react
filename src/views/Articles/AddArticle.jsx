import { getTagsClassifyApi, addArticlesApi } from '../../server/articles'
import MDEditor from '@uiw/react-md-editor';
import marked from 'marked'
import { useState, useEffect} from 'react'
import React from 'react'
import { withRouter } from "react-router-dom";
import { Card, Radio ,Row, Col, Space, Tag, Button, Input, Form, message} from "antd";
const { CheckableTag } = Tag;

const titleRef = React.createRef()


function AddArticle(props){
   
    const [classifies, setClassifies] = useState([])  //获取的全部分类
    const [tags, setTags] = useState([])   //获取的全部标签
    const [value, setValue] = useState("**Hello world!!!**");
    const [info, setInfo] = useState({  //选中的分类
        classifyid: 0,
        classifyName: ''
    })
    const [selectTags, setSelectTags] = useState([])  //选中的标签id,name
    const [selectTagsName, setSelectTagsName] = useState([])  //选中的标签名字

    useEffect(()=>{
        initData()
    },[])

    function initData(){
        // 获取所有分类和所有标签
        getTagsClassifyApi().then(res=>{
            if(res.code === 200){
                setClassifies(res.classifies)
                setTags(res.tags)
            }
        })
    }

    function handleChange(e){
        console.log(e);
        setInfo({
            classifyid: e.target.value,
            classifyName: e.target['data-name'],
        })
 
    }
    function handleTagChange(tag, checked){
        console.log(tag, checked);

        const a = checked ? [...selectTagsName, tag.tag_name] : selectTagsName.filter(t => t !== tag.tag_name);
        console.log(a);
        setSelectTagsName(a)


        let tempArr = selectTags
        if(checked){  //添加
            tempArr.push(tag)
        }else{  //删除
            let index = tempArr.indexOf(tag)
            tempArr.splice(index,1)
        }
        setSelectTags([...tempArr])
    }
    function publish(){
        if(!localStorage.getItem('token')){
            
            message.error('登录过期，请先登录！即将跳转')
            setTimeout(()=>{props.history.push('/login')},1500)
            return;
        }
        let obj = {
            ...info,
            selectTags,
            selectTagsName,
            title: titleRef.current.getFieldsValue()['title'],
            value,
            content: marked(value),
            user_id: localStorage.getItem('token')
        }
        console.log(obj);
        addArticlesApi(obj).then(res=>{
            if(res.code == 200){
                message.success('文章发布成功！')
                setTimeout(()=>{
                    // props.history.push("/admin/articles");
                    props.history.goBack()
                },1500)
            }else{
                message.error('文章发布失败，稍后再试！')
            }
        })
    }

    return (<Card title='添加文章'>
        <Row style={{marginBottom: 15}}>
            <Col >文章分类：</Col>
            <Col span={20}>
                <Radio.Group value={info.classifyid} onChange={handleChange}>
                    {classifies.map(item=>{
                        return (<Radio key={item.id} value={item.id} data-name={item.category_name}>{item.category_name}</Radio>)
                    })}
                </Radio.Group>
            </Col>
        </Row>
        <Row style={{marginBottom: 15}}>
            <Col>添加文章标签：</Col>
            <Col>
                <Space>
                    {tags.map(item=>{
                        return (<CheckableTag key={item.id} 
                                checked={selectTagsName.indexOf(item.tag_name) > -1}
                                onChange={checked => handleTagChange(item, checked)}
                            >
                                {item.tag_name}
                            </CheckableTag>)
                    })}
                </Space>
            </Col>
        </Row>
        <Row style={{marginBottom: 15}}>
            <Col style={{paddingTop: 4}}>文章标题：</Col>
            <Col span={22}>
                <Form ref={titleRef}> <Form.Item name='title'><Input /></Form.Item> </Form>
            </Col>
        </Row>
        <Row style={{marginBottom: 15}}>
            <Col span={24}>
                <MDEditor
                    height='410'
                    value={value}
                    onChange={(val) => {
                        setValue(val);
                    }}
                />
            </Col>
        </Row>
        <Row>
            <Col span={20}></Col>
            <Col span={4}>
                <Button type="primary" onClick={publish}>发布文章</Button>
            </Col>
        </Row>
       
    
        
    </Card>)
    
}
// export default AddArticle
export default withRouter(AddArticle)