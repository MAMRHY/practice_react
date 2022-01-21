import React from 'react'
import './index.css'
import { Menu } from 'antd';
import {
    HighlightOutlined,
    PieChartOutlined,
    PaperClipOutlined,
    ClusterOutlined
} from '@ant-design/icons';
import {withRouter} from 'react-router-dom'  //引入


class nAside extends React.Component{
    state = {
        collapsed: false,
    };
    
    nav(path){
        this.props.history.push(path)
    }

    render() {
        return (
          <div style={{ width: 256}}>
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['1']}
              mode="inline"
              theme="ligth"
              inlineCollapsed={this.state.collapsed}
            >
              <Menu.Item key="1" icon={<PieChartOutlined />} onClick={()=>this.nav('/admin/home')}>
                数据总览
              </Menu.Item>
              <Menu.Item key="2" icon={<HighlightOutlined />} onClick={()=>this.nav('/admin/articles')} >
                文章管理
              </Menu.Item>
              <Menu.Item key="3" icon={<ClusterOutlined />} onClick={()=>this.nav('/admin/classify')}>
                分类管理
              </Menu.Item>
              <Menu.Item key="4" icon={<PaperClipOutlined />} onClick={()=>this.nav('/admin/tags')}>
                标签管理
              </Menu.Item>
            </Menu>
          </div>
        )};
      
}
let Aside = new withRouter(nAside)//处理组件

export default Aside