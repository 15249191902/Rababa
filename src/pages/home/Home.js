import React, { useEffect, useState } from 'react'
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
  Modal,
  Input,
  Radio,
} from 'antd'
import homeCss from "./Home.module.scss"
import { UploadOutlined } from '@ant-design/icons'
const { TextArea } = Input;
const Home = () => {
    // table数据
    const [dataSource, setDateSource] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [sex, setSex] = useState(0)
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
    function addBtn () {
      // 打开弹框
      setAddModal(true)
    }
    // 关闭弹框
    function closedModal () {
      setAddModal(false)
    }
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
    function aa(event) {
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = function(event) {
        // 文件里的文本会在这里被打印出来
        console.log(event.target.result)
      };
      reader.readAsText(file);
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
    function saveMethod () {
      // 保存数据
      let data =  {
         
      }
      closedModal();
    }
    function cancelMethod () {
      closedModal();
    }
    function sexChange (e) {
      const val = e.target.value;
      setSex(val)
    }
    useEffect(() => {
      // 初始化数据
      initData();
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
          <div className={homeCss.content}>
            <Button type="primary" onClick={addBtn}>新增</Button>
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
            <input type="file" onChange={aa}></input>
            {/* <form action="/upload/fileUpload" enctype="multipart/form-data" method="post">
              <div className="form-group">
                <input type="file" name="file"/>
                <input type="submit" value="上传图片"/>            
              </div>
            </form> */}
          </div>
          <Modal
            title="add singer"
            visible={addModal}
            onOk={saveMethod}
            onCancel={cancelMethod}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Input placeholder="singer name"></Input>
              </Col>
              <Col span={24}>
                <Radio.Group onChange={sexChange} value={sex}>
                  <Radio value={0}>man</Radio>
                  <Radio value={1}>woman</Radio>
                </Radio.Group>
              </Col>
              <Col span={24}>
                <TextArea rows={4} placeholder="remark"/>
              </Col>
            </Row>
          </Modal>
        </div>
    )
}
export default Home