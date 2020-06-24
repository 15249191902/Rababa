import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  // getUserByPage,
  // deleteUserByIdApi,
  addUser,
  getSingerList,
  deleteSinger
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
  Spin,
} from 'antd'
import homeCss from "./Home.module.scss"
import { UploadOutlined } from '@ant-design/icons'
const { TextArea } = Input;
const Home = () => {
    // table数据
    const [dataSource, setDateSource] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [sex, setSex] = useState(0)
    const [singerName, setSingerName]  = useState("不知名");
    const [remark, setRemark] = useState("这个人很懒，所以什么也没写！")
    const [spinning, setSpinning] = useState(false)
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
        title: '歌手名称',
        dataIndex: 'singer_name',
        align: 'center',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        align: 'center',
        render: function (item, record) {
          let sex = "女"
          if (item === 0) {
            sex = "男"
          }
          return sex
        }
      },
      {
        title: '备注',
        dataIndex: 'remark',
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        align: 'center',
        render : function (item, record) {
          return (
            <Button type="primary" onClick={(e) => deleteBtn(record, e)}>删除</Button>
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
    function deleteBtn (record, e){
      setSpinning(true);
      deleteSinger({seqId: record.seq_id}).then(res => {
        setSpinning(false);
        let rData = res.data;
        if (rData.status === 0) {
          initData();
        }
      }).catch(res => {
        setSpinning(false);
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
      setSpinning(true);
      getSingerList({pageNo:1, pageSize:10}).then(res => {
        setSpinning(false);
        let rData = res.data
        if (rData.status === 0) {
          let arr = rData.data.list.map(item => {
            item.key =  item.seq_id
            return item;
          });
          setDateSource(arr);
        }
      }).catch(res => {
        setSpinning(false);
      })
    }
    function saveMethod () {
      // 保存数据
      let user =  {
        singerName: singerName, 
        sex: sex,
        remark: remark
      }
      // 插入操作
      setSpinning(true);
      addUser({user}).then(res => {
        setSpinning(false);
        if (res.data.status === 0) {
          closedModal();
          initData();
        }
      }).catch(res => {
        setSpinning(false);
      })
    }
    function cancelMethod () {
      closedModal();
    }
    function sexChange (e) {
      const val = e.target.value;
      setSex(val)
    }
    function singerNameChange (e) {
      const val = e.target.value;
      setSingerName(val)
    }
    function remarkChange (e) {
      const val = e.target.value;
      setRemark(val)
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
      <Spin spinning={spinning}>
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
                <Input placeholder="singer name" value={singerName} onChange={singerNameChange}></Input>
              </Col>
              <Col span={24}>
                <Radio.Group onChange={sexChange} value={sex}>
                  <Radio value={0}>man</Radio>
                  <Radio value={1}>woman</Radio>
                </Radio.Group>
              </Col>
              <Col span={24}>
                <TextArea rows={4} placeholder="remark" value={remark} onChange={remarkChange}/>
              </Col>
            </Row>
          </Modal>
        </div>
      </Spin>
    )
}
export default Home