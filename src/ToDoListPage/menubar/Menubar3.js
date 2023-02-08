import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TodoView3 from "../todolist3/TodoView";
import FeedList from "./FeedList";
import ChallengeList from "./ChallengeList";
import TemplateView from "./TemplateView";
import {Component} from "react";
import TemplateCard from "../../template/component/TemplateCard";
import TemplateList from "../../template/component/TemplateList";
import TemplateListView from "../../template/page/TemplateListView";
import Test1 from "../../feedPage/Test1";
import Test from "../../feedPage/test"

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(2);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab label="Todo-List" {...a11yProps(0)} />
                    <Tab label="ChallengeList" {...a11yProps(1)} />
                    <Tab label="Feed" {...a11yProps(2)} />
                    <Tab label="Template" {...a11yProps(3)} />
                    <Tab label="test" {...a11yProps(4)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <TodoView3 />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Test></Test>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <FeedList/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <TemplateView/>
            </TabPanel>


            {/*<div className="menubar-box">*/}
            {/*    <div className="menuBar">*/}
            {/*        <ul className="tabs">*/}
            {/*            <li className={`${this.state.menu === 0? 'active': ''}`}*/}
            {/*                onClick={() => this.changeMenu(0)}>TodoList</li>*/}
            {/*            <li className={`${this.state.menu === 1? 'active': ''}`} onClick={() => this.changeMenu(1)}>Feed</li>*/}
            {/*            <li className={`${this.state.menu === 2? 'active': ''}`} onClick={() => this.changeMenu(2)}>Challenge</li>*/}
            {/*            <li className={`${this.state.menu === 3? 'active': ''}`} onClick={() => this.changeMenu(3)}>Template</li>*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*    <div className="contentArea">*/}
            {/*        {menuList[this.state.menu]}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </Box>
    );
}