import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import {
    Container, Header, Aside, Main, Footer, Image, Link, Message, Alert,
    Button, ButtonGroup, Checkbox, CheckboxGroup, Row, Col, Card, Input, Form, FormItem
} from 'element-ui';

Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Image);
Vue.use(Link);
Vue.use(Alert);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);

Vue.prototype.$message = Message;
