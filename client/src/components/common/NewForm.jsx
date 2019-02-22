import React, { Component } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Icon
} from "antd";

const { Option } = Select;

class NewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    this.props.form.setFieldsValue({ type: this.state.vacationType });
  }

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({
        visible: false
      });
      console.log(values);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          <Icon type="plus" /> Yeni Kayıt
        </Button>
        <Drawer
          title="Yeni İzin Talebi Oluştur"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          style={{
            overflow: "auto",
            height: "calc(100% - 108px)",
            paddingBottom: "108px"
          }}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Tarih">
                  {getFieldDecorator("date", {
                    rules: [{ required: true, message: "Bu alan zorunludur" }]
                  })(
                    <DatePicker.RangePicker
                      style={{ width: "100%" }}
                      getPopupContainer={trigger => trigger.parentNode}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="İzin Tipi">
                  {getFieldDecorator("type", {
                    rules: [{ required: true, message: "Bu alan zorunludur" }]
                  })(
                    <Select placeholder="izin tipini seçiniz">
                      <Option value="Doğum">Doğum izni</Option>
                      <Option value="Evlilik">Evlilik izni</Option>
                      <Option value="Sağlık">Sağlık izni(Raporlu)</Option>
                      <Option value="İdari">İdari izin</Option>
                      <Option value="Ücretsiz">Ücretsiz izin</Option>
                      <Option value="Yıllık">Yıllık izin</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Gün">
                  <Input name="day" placeholder="Gün sayısı" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="İzne çıkış nedeni">
                  {getFieldDecorator("reason", {
                    rules: [{ required: true, message: "Bu alan zorunludur" }]
                  })(
                    <Input.TextArea
                      name="reason"
                      rows={4}
                      placeholder="Açıklama giriniz..."
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="İzinde bulunacağı adres">
                  {getFieldDecorator("address", {
                    rules: [{ required: true, message: "Bu alan zorunludur" }]
                  })(
                    <Input.TextArea
                      name="adress"
                      rows={4}
                      placeholder="Adres giriniz..."
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 90,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              padding: "10px 16px",
              background: "#fff",
              textAlign: "center"
            }}
          >
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              Vazgeç
            </Button>
            <Button onClick={this.onClose} type="primary">
              Gönder
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default Form.create()(NewForm);