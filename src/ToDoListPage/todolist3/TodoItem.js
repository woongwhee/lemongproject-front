import React , {useState, useEffect} from 'react';
import styledr, { css } from 'styled-components';
import { MdDone, MdDelete, MdCreate, MdOutlineCreate, MdClear } from 'react-icons/md';
import { FaRegLemon, FaLemon } from 'react-icons/fa';
import { GiOrangeSlice }  from "react-icons/gi";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import moveMark  from '../../reducer/mark';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import Label from '@mui/icons-material/Label';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { BsThreeDots } from 'react-icons/bs'

//애니메이션 라이브러리
//npm install animate.css --save
import 'animate.css';

const Remove = styledr.div`
  display: flex;
  align-items: center;
  justify-content: left;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  // display: none;
`;

const Update = styledr.div`
display: flex;
align-items: center;
justify-content: left;
color: #dee2e6;
font-size: 24px;
cursor: pointer;
//background-color: skyblue;
  &:hover {
    color: skyblue;
  }
  //display: none;
`;

const Delay = styledr.div`
display: flex;
align-items: center;
justify-content: left;
color: #dee2e6;
font-size: 24px;
cursor: pointer;
//background-color: skyblue;
  &:hover {
    color: #FFEE4E;
  }
  //display: none;
`;

const TodoItemBlock = styledr.div`
  display: flex;
  //align-items: center;
  margin : center;
  padding-top: 12px;
  padding-bottom: 12px;
  //border: 3px solid orange;
  width : 470px;
  // &:hover {
  //   ${Remove} {
  //     display: initial;
  //   }
  }
  &:hover{
    transform : scale(1.02);
  }
`;

const CheckCircle = styledr.div`
  width: 35px;
  height: 35px;
  color : #9795f0;
  //text-fill-color : transparent;
  //background-clip: text;
 
  //background에 그라데이션 넣기
  //background: linear-gradient(to top, #9795f0 0%, #fbc8d4 100%);

  //border에 그라데이션 넣기
  border-radius: 11px;
  border: 2.5px solid transparent;
  background-image: linear-gradient(#fff, #fff),linear-gradient(to top, #9795f0 0%, #fbc8d4 100%);
  background-origin: border-box; //배경위치 시작지점 : 
  background-clip: content-box, border-box; //배경이미지를 잘라낼 위치

  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  &:hover{
    transform : scale(1.05);
  }
  ${todo =>
    todo.clear &&
    css`
      border: 2.5px solid #FFEE4E;
      color: 	#FFEE4E;
      width : 35px;
      height: 35px;
      animation : fadeIn;
      animation-duration: 1s;
    ` }

`;

const Text = styledr.div`
  flex: 1;
  font-size: 18px;
  color: #495057;
  margin-top : 5px;
 // border: 3px solid pink;
  ${todo =>
    todo.clear &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    //borderTopRightRadius: theme.spacing(2),
    //borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(0),
    paddingLeft: theme.spacing(6),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
       fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
        backgroundColor: theme.palette.action.selected,
    },
    '&.Mui-selected': {
       backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      //backgroundColor: `var(--tree-view-bg-color, #FFEE4E)`,
      //color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      // fontWeight: 'inherit',
       color: 'white',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      //paddingLeft: theme.spacing(1),
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
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr:0 }} />
          <Typography variant="body1" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
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




function TodoItem({todo, onDel, onToggle, onUpdate, onDelay}) {

  const dispatch = useDispatch();
  
  //수정 모드 확인하기 위한 값
  const [edite, setEdite] = useState(false);
  
  //수정된 투두 content
  const [editeTodo, setEditeTodo] = useState(todo.todoContent);

  //수정버튼을 눌렀을 때 input창으로 변환
  const onClickEdite = () => {
    setEdite(true);
  }

  //수정하기 취소 버튼
  const onClickEditex = () => {
    setEdite(false);
  }

  //새로 값이 입력되면 setEditeTodo에 내용을 저장
  const onEditeTodo = (e) => {
    setEditeTodo(e.target.value);
  }

  function moveMark(){
    dispatch({type : 'MOVE' });
  }

  return (
    <TodoItemBlock className='animate__animated animate__fadeIn' >
      {/* 완료 */}
      <CheckCircle clear={todo.clear} onClick={()=>{onToggle(todo.todoNo); moveMark();}} >
        { todo.clear ? <FaLemon /> : <FaRegLemon />}
      </CheckCircle>

      {/* 내용 */}
      {edite ? (
        //수정버튼을 눌렀을 때 input태그가 뜬다.
        <input type="text" value={editeTodo} onChange={onEditeTodo}/>
      ) : (
        //수정버튼을 누르지 않은 상태에서는 일반 text창이 뜬다.
        <Text clear={todo.clear}>{todo.todoContent}</Text>
      )}

      {/* 수정버튼 */}
      {!todo.clear ? ( 
        edite ? (
          <> {/* 수정하기 버튼을 누르면 나오는 버튼들 */}
          <Update>
            <MdCreate onClick={()=>onUpdate(todo.todoNo, editeTodo, setEdite)}/> {/* 수정 완료 버튼 */}
          </Update>
          <Remove >
            <MdClear onClick={onClickEditex} /> {/* 수정 취소 버튼 */}
          </Remove>
          </>
        ) : (
          <> {/* 일반적으로 투두 생성시 나오는 버튼들 */}
          <TreeView
            aria-label="gmail"
            //defaultExpanded={['3']}
            defaultCollapseIcon={<BsThreeDots />}
            defaultExpandIcon={<BsThreeDots />}
            //defaultEndIcon={<div style={{ width: 20, margin: 'right' }} />}
            // sx={{ border: '1px solid pink' }}
          >
          <StyledTreeItem nodeId="1" labelText="" labelIcon={Delay}
          sx={{backgroundColor: 'white', overflow: 'visible'}}
          >

            <Delay>
              <GiOrangeSlice onClick={()=>{onDelay(todo.todoNo); moveMark();}} /> {/* 내일로 미루기 */}
              <p style={{fontSize: '12.7px', margin: 'auto'} }>미루기</p>
            </Delay>
            <Update>
              <MdOutlineCreate onClick={onClickEdite}/> {/* 수정하기 버튼 */}
              <p style={{fontSize: '12.8px', margin: 'auto'}}>수정</p>
            </Update>
            <Remove >
              <MdClear onClick={()=>{onDel(todo.todoNo); moveMark();}}/> {/* 삭제버튼 */}
              <p style={{fontSize: '12.8px', margin: 'auto'}}>삭제</p>
            </Remove>

          </StyledTreeItem>
          </TreeView>
          </>
        )
      ) : null} {/* 완료된 투두일 경우 수정 버튼이 뜨지 않게 한다. */}

      {/* 삭제버튼   */}
      {/* {edite ? 
        //수정시에는 삭제버튼이 보이지 않게
        null : (
          <Remove >
            <MdClear onClick={()=>onDel(todo.todoNo)} />
          </Remove>
        )
      }  */}
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);
