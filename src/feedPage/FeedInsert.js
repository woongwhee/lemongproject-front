import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './FeedInsert.css'
import FeedPictureInsert from "./FeedPictureInsert";
import Button from '@mui/material/Button';
import BasicTabs from "./FeedInsertCss";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {TextField} from "@mui/material";

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


function FeedInsert() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [userNo, SetUserNo] = useState();
    const [content, SetContent] = useState("");

    const [insertPhotoNo, setInsertPhotoNo] = useState([]);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Insert Photo" {...a11yProps(0)} />
                    <Tab label="New Content" {...a11yProps(1)} />
                    {/*<Tab label="Item Three" {...a11yProps(2)} />*/}
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <FeedPictureInsert setInsertPhotoNo={setInsertPhotoNo}></FeedPictureInsert>
            </TabPanel>
            <TabPanel value={value} index={1}>
                {/*<p>아이디</p>*/}
                {/*<input onChange={(e) => {SetUserNo(e.target.value);}}/>*/}
                <TextField
                    id="standard-multiline-flexible"
                    label="아이디 입력"
                    multiline
                    maxRows={4}
                    variant="standard"
                    onChange={(e) => {SetUserNo(e.target.value);}}
                /><br/>
                {/*<p>피드 내용</p>*/}
                {/*<input onChange={(e) => {SetContent(e.target.value);}}/>*/}
                <TextField
                    id="standard-multiline-flexible"
                    label="내용입력"
                    multiline
                    maxRows={4}
                    variant="standard"
                    sx={{marginTop:"50px"}}
                    onChange={(e) => {SetContent(e.target.value);}}
                />
                <br/>
                <Button className="feed-insert-button" variant="success" onClick={
                    () => {
                        axios.post('api/feed/insert', {
                            userNo:userNo,
                            feedContent:content,
                            photoNo:insertPhotoNo
                        }).then(function (res){
                            console.log(res.data);
                            window.location.reload();
                        }).catch(function () {
                            console.log('실패함' + userNo, content)
                        })
                    }}
                >전송</Button>
            </TabPanel>
            {/*<TabPanel value={value} index={2}>*/}
            {/*    Item Three*/}
            {/*</TabPanel>*/}
        </Box>
    );

}


export default FeedInsert;