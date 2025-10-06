import React from 'react'
import {
    Layout, Menu, Row, Col, List, Typography, Table,
    Form, Input, InputNumber, Radio, Select, Checkbox, Button,
    Grid, Card
} from 'antd'

const { Header, Content, Footer } = Layout
const { Paragraph } = Typography

// ===== Таблица: данные =====
const tableData = [
    { key: 1, col1: 'Ячейка 1.1 объединена с 1.2', col2: '', col3: 'Ячейка 1.3', col4: 'Ячейка 1.4' },
    { key: 2, col1: 'Ячейка 2.1', col2: 'Ячейка 2.2', col3: 'Ячейка 2.3', col4: 'Ячейка 2.4' },
    { key: 3, col1: 'Ячейка 3.1', col2: 'Ячейка 3.2', col3: 'Ячейка 3.3', col4: 'Ячейка 3.4' },
    { key: 4, col1: 'Ячейка 4.1', col2: 'Ячейка 4.2', col3: 'Ячейка 4.3', col4: 'Ячейка 4.4' },
    { key: 5, col1: 'Ячейка 5.1', col2: 'Ячейка 5.2', col3: 'Ячейка 5.3', col4: 'Ячейка 5.4' },
    { key: 6, col1: 'Ячейка 6.1', col2: 'Ячейка 6.2', col3: 'Ячейка 6.3', col4: 'Ячейка 6.4' },
]

// ===== Таблица: колонки (объединяем 1-ю строку col1+col2) =====
const tableColumns = [
    {
        title: 'Колонка 1',
        dataIndex: 'col1',
        onCell: (_, rowIndex) => (rowIndex === 0 ? { colSpan: 2 } : {}),
        onHeaderCell: () => ({ colSpan: 2 }),
    },
    {
        title: 'Колонка 2',
        dataIndex: 'col2',
        onCell: (_, rowIndex) => (rowIndex === 0 ? { colSpan: 0 } : {}),
        onHeaderCell: () => ({ colSpan: 0 }),
    },
    { title: 'Колонка 3', dataIndex: 'col3' },
    { title: 'Колонка 4', dataIndex: 'col4' },
]

// ===== Список ссылок =====
const linksData = [
    { id: 1, node: <a href="http://kubsu.ru/">Перейти на КубГУ (HTTP)</a> },
    { id: 2, node: <a href="https://kubsu.ru/">Перейти на КубГУ (HTTPS)</a> },
    { id: 3, node: (
            <a href="https://kubsu.ru/" title="Открыть kubsu.ru">
                <img className="banner" src="img/banner.svg" alt="Баннер: Открыть kubsu.ru" />
            </a>
        )
    },
    { id: 4, node: <a href="/index.html">Моя внутренняя страница (/index.html)</a> },
    { id: 5, node: <a href="/">На главную сайта (/)</a> },
    { id: 6, node: <a href="#form">Перейти к форме ниже</a> },
    { id: 7, node: <a href="https://www.example.com/search?topic=web&year=2025&lang=ru">Результаты по теме «web», 2025, RU</a> },
    { id: 8, node: <a href="https://www.example.com/item?id=42">Карточка товара №42</a> },
    { id: 9, node: <a href="page2.html">Открыть страницу page2.html (рядом с этой)</a> },
    { id: 10, node: <a href="about/page3.html">Открыть about/page3.html (в папке about)</a> },
    { id: 11, node: <a href="../parent.html">Файл в папке уровнем выше (../parent.html)</a> },
    { id: 12, node: <a href="../../start.html">Файл на два уровня выше (../../start.html)</a> },
    { id: 13, node: (
            <Paragraph>
                Полезная <a href="https://developer.mozilla.org/ru/" target="_blank" rel="noreferrer">документация MDN</a> по веб-разработке.
            </Paragraph>
        )
    },
    { id: 14, node: <a href="https://www.youtube.com/watch?v=MpomXaT8IwU" target="_blank" rel="noreferrer">IOS 26</a> },
    { id: 15, node: (
            <div>
                Интерактивное изображение:<br/>
                <img className="map-img" alt="Карта с зонами" useMap="#zones" src="img/map.svg" />
                <map name="zones">
                    <area shape="rect" coords="10,10,210,110" href="https://www.example.com/rect" alt="Прямоугольная область — перейти" />
                    <area shape="circle" coords="350,110,55" href="https://www.example.com/circle" alt="Круглая область — перейти" />
                </map>
            </div>
        )
    },
    { id: 16, node: <a href="">Обновить текущую страницу</a> },
    { id: 17, node: <a>ссылка без href</a> },
    { id: 18, node: <a href="https://www.example.com/partners" rel="nofollow">ссылка, по которой запрещен переход поисковикам</a> },
    { id: 19, node: <a href="https://www.example.com/private" rel="noindex">запрещенная для индексации поисковиками</a> },
    { id: 20, node: (
            <div>
                Справочные материалы:
                <ol>
                    <li><a href="https://developer.mozilla.org/ru/docs/Web/HTML">HTML — MDN</a></li>
                    <li><a href="https://developer.mozilla.org/ru/docs/Web/CSS">CSS — MDN</a></li>
                    <li><a href="https://developer.mozilla.org/ru/docs/Web/HTTP">HTTP — MDN</a></li>
                </ol>
            </div>
        )
    },
    { id: 21, node: <a href="ftp://demo:password@test.rebex.net/pub/example/readme.txt">Скачать по FTP: demo@test.rebex.net → readme.txt</a> },
]

const languages = ['Pascal','C','C++','JavaScript','PHP','Python','Java','Haskel','Clojure','Prolog','Scala']

export default function App() {
    const [form] = Form.useForm()
    
    const screens = Grid.useBreakpoint()

    const onFinish = (values) => console.log('Данные формы:', values)

    return (
        <Layout>
            {/* === ШАПКА + МЕНЮ === */}
            <Header className="site-header" style={{ background: '#f5f5f5', padding: '8px 0' }}>
                <div className="wrap">
                    <Row align="middle" justify="space-between" gutter={12}>
                        {/* ЛОГО + НАЗВАНИЕ */}
                        <Col flex="none">
                            <Row align="middle" gutter={12} wrap={false}>
                                <Col><img className="logo" src="img/image.png" alt="Логотип" /></Col>
                                <Col><h1 className="site-title" style={{ margin: 0 }}>Мой сайт</h1></Col>
                            </Row>
                        </Col>

                        {/* МЕНЮ (справа на десктопе, снизу и вертикально на телефоне) */}
                        <Col className="menu-col" flex="auto">
                            <Menu
                                mode={Grid.useBreakpoint().md ? 'horizontal' : 'inline'}
                                theme="light"
                                selectable={false}
                                style={{ background: 'transparent' }}
                                items={[
                                    { key: '1', label: <a href="#">Главная</a> },
                                    { key: '2', label: <a href="#">О сайте</a> },
                                    { key: '3', label: <a href="#">Контакты</a> },
                                ]}
                            />
                        </Col>
                    </Row>
                </div>
            </Header>
            {/* Контент */}
            <Content style={{ padding: '20px 12px', marginTop: 12 }}>
                <div className="wrap adaptive">
                    {/* 1) Ссылки — первые на десктопе, вторые на мобиле */}
                    <Card className="block-links" title="Список ссылок" bordered style={{ marginTop: 12 }}>
                        <List
                            dataSource={linksData}
                            renderItem={(it) => <List.Item key={it.id}>{it.node}</List.Item>}
                            bordered
                        />
                    </Card>

                    {/* 2) Таблица — вторая на десктопе, первая на мобиле */}
                    <Card className="block-table" title="Таблица" bordered style={{ marginTop: 16 }}>
                        <Table
                            columns={tableColumns}
                            dataSource={tableData}
                            bordered
                            pagination={false}
                            aria-label="Пример таблицы"
                            scroll={{ x: 'max-content' }}
                        />
                    </Card>

                    {/* Форма */}
                    <Card className="block-form" title="Форма" bordered style={{ marginTop: 16 }} id="form">
                        <Form
                            form={form}
                            name="userForm"
                            labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
                            wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ name: 'Иванов Иван Ашотович' }}
                            onFinish={onFinish}
                        >
                            <Form.Item label="ФИО" name="name"><Input /></Form.Item>
                            <Form.Item label="Номер телефона" name="phone"><Input placeholder="+7 999 123-45-67" /></Form.Item>
                            <Form.Item label="Email" name="email"><Input type="email" placeholder="email@gmail.com" /></Form.Item>
                            <Form.Item label="Дата рождения" name="birthdate"><InputNumber style={{ width: '100%' }} /></Form.Item>
                            <Form.Item label="Пол" name="gender">
                                <Radio.Group>
                                    <Radio value="male">Мужской</Radio>
                                    <Radio value="female">Женский</Radio>
                                    <Radio value="other">Другое</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="Любимый язык" name="languages">
                                <Select mode="multiple" placeholder="Выберите языки">
                                    {languages.map(l => <Select.Option key={l} value={l}>{l}</Select.Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Биография" name="bio"><Input.TextArea rows={4} placeholder="Биография" /></Form.Item>
                            <Form.Item name="agree" valuePropName="checked" wrapperCol={{ sm: { offset: 8, span: 16 }, xs: { span: 24 } }}>
                                <Checkbox>С контрактом ознакомлен(а)</Checkbox>
                            </Form.Item>
                            <Form.Item wrapperCol={{ sm: { offset: 8, span: 16 }, xs: { span: 24 } }}>
                                <Button type="primary" htmlType="submit">Сохранить</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </Content>

            {/* Подвал */}
            <Footer style={{ background: '#d9d9d9', textAlign: 'center' }}>
                © 2025 Леонов Константин
            </Footer>
        </Layout>
    )
}