
import { Card ,} from "antd";
import './index.css'
import { LikeOutlined, EyeOutlined, SnippetsOutlined } from '@ant-design/icons';


function Home(){
    return (
        <Card>
            <div className="topBox">
                <div style={{backgroundColor: '#667eea'}}> <p className="s_t">文章数</p> <p className="b_b_t"> <SnippetsOutlined /> 3,600</p> </div>
                <div style={{backgroundColor: '#f09819'}}> <p className="s_t">阅读量</p> <p className="b_b_t"> <EyeOutlined /> 489,200</p> </div>
                <div style={{backgroundColor: '#f43b47'}}> <p className="s_t">点赞数</p> <p className="b_b_t"> <LikeOutlined /> 1,200</p>  </div>
            </div>
            {/* // TODO 加两个图表，还没想好怎么展示 */}
        </Card>
    )

}

export default Home
