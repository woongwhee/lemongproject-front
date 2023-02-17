import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import {Alert} from "@mui/lab";
import TreeItem, {treeItemClasses} from "@mui/lab/TreeItem";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import DeleteIcon from '@mui/icons-material/Delete';
import swal from 'sweetalert';

function FeedDelete(props) {

    let Feed = props.Feed;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const feedNo = Feed.feedNo;

    const deleteFeed = () => {
            axios.post(
                'api/feed/deleteFeed',{
                    feedNo:feedNo,
                    // photoNo:photoNo
                }).then(function (){
                handleClose();
                swal({
                    title: "삭제성공",
                    icon: "success",
                    button: "Aww yiss!",
                }).then(()=>{
                    window.location.reload("/main")
                });
            })
    }
    const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
        color: theme.palette.text.secondary,
        [`& .${treeItemClasses.content}`]: {
            color: theme.palette.text.secondary,
            borderTopRightRadius: theme.spacing(2),
            borderBottomRightRadius: theme.spacing(2),
            paddingRight: theme.spacing(1),
            fontWeight: theme.typography.fontWeightMedium,
            '&.Mui-expanded': {
                fontWeight: theme.typography.fontWeightRegular,
            },
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
            '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
                backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
                color: 'var(--tree-view-color)',
            },
            [`& .${treeItemClasses.label}`]: {
                fontWeight: 'inherit',
                color: 'inherit',
            },
        },
        [`& .${treeItemClasses.group}`]: {
            marginLeft: 0,
            [`& .${treeItemClasses.content}`]: {
                paddingLeft: theme.spacing(2),
            },
        },
    }));
    function StyledTreeItem(props) {
        const {
            bgColor,
            color,
            labelIcon: LabelIcon,
            labelInfo,
            labelText,
            ...other
        } = props;

        return (
            <StyledTreeItemRoot
                label={
                    <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
                        <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: "inherit", flexGrow: 1 }}
                        >
                            {labelText}
                        </Typography>
                        <Typography variant="caption" color="inherit">
                            {labelInfo}
                        </Typography>
                    </Box>
                }
                style={{
                    "--tree-view-color": color,
                    "--tree-view-bg-color": bgColor
                }}
                {...other}
            />
        );
    }
    StyledTreeItem.propTypes = {
        bgColor: PropTypes.string,
        color: PropTypes.string,
        labelIcon: PropTypes.elementType.isRequired,
        labelInfo: PropTypes.string,
        labelText: PropTypes.string.isRequired,
    };
    return (
        <>
            {/*<Button*/}
            {/*    variant="danger"*/}
            {/*    size="sm"*/}
            {/*    onClick={handleShow}>삭제하기</Button>*/}
            {/*<TreeItem nodeId="2" label="삭제하기" onClick={handleShow}/>*/}

            <StyledTreeItem
                nodeId="5"
                labelText=""
                labelIcon={DeleteIcon}
                labelInfo=""
                color="#1a73e8"
                bgColor="#e8f0fe"
                onClick={handleShow}
            />

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>피드 삭제하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    삭제하기 버튼 클릭시 이 피드는 삭제됩니다.<br/>
                    삭제하시겠습니까?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <Button variant="danger" onClick={deleteFeed}>삭제하기</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FeedDelete;