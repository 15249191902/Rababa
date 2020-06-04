import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import {
  getUserByPage,
  deleteUserByIdApi
  // getUserData1,
} from "api/userApi/user.js"
import { 
  Button,
  Row,
  Col,
  Table,
  Upload,
  message,
} from 'antd'
import homeCss from "./Home.module.scss"
import {UploadOutlined} from '@ant-design/icons'
import "./Home.css"
function Home () {
    // table数据
    const [dataSource, setDateSource] = useState([])
    const props = {
      name: 'file',
      action: '/upload/fileUpload',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    // 表头
    const columns = [
      {
        title: '项目名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '数量',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '操作',
        key: "operate",
        render : function (item, record) {
          return (
            <Button type="primary" onClick={(e) => deleteBtn(record.key, e)}>删除</Button>
          )
        }
      }
    ];
    let history = useHistory();
    function handleClick() {
      history.push("/Detail");
    }
    // 删除一条
    function deleteBtn (id, e){
      deleteUserByIdApi({id: id}).then(res => {
        let rData = res.data;
        if (rData.status === 0) {
          initData();
        }
      })
    }
    function initData () {
      getUserByPage({pageNo:1, pageSize:10}).then(res => {
        let rData = res.data
        if (rData.status === 0) {
          let arr = rData.data.user.map(item => {
            return {
              key: item.id,
              name: item.name,
              age: item.age
            }
          });
          setDateSource(arr);
        }
      })
    }
    useEffect(() => {
      // 初始化数据
      initData();
      console.log(require.resolve('style-loader'))
      // let rq1 = getUserData({pageNo: 1, pageSize: 10}).then(res => {
      //   // console.log(res);
      //   // console.log(res)
      //   return res;
      // })
      // let rq2 = getUserData1({pageNo: 1, pageSize: 10}).then(res => {
      //   // console.log(res);
      //   // console.log(res)
      //   return res;
      // })
      // Promise.all([rq1, rq2]).then(res => {
      //   console.log(res)
      // })
    },[])
    return (
        <div className={homeCss.contain}>
        {/* <div className="contain"> */}
          <div className={homeCss.content}>
            <header>
              <Row>
                <Col className="gutter-row" span={6}>
                  <div className={homeCss.headerItem} onClick={() => {
                    history.push("/Home")
                  }}>首页</div>
                </Col>
                <Col className="gutter-row" span={6}>
                  <div className={homeCss.headerItem} onClick={handleClick}>组织详情</div>
                </Col>
                <Col className="gutter-row" span={6}>
                  <div className={homeCss.headerItem} >质量分析</div>
                </Col>
                <Col className="gutter-row" span={6}>
                  <div className={homeCss.headerItem}>标准设备管理</div>
                </Col>
              </Row>
            </header>
            <Table dataSource={dataSource} columns={columns} />
            <Button type="primary">button</Button>
            <Upload {...props}>
              <Button>
                <UploadOutlined /> Click to Upload
              </Button>
            </Upload>
          </div>
        </div>
    )
}
export default Home