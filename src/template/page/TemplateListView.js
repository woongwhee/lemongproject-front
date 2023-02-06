import {templateList} from "../templateApi";
import Loading from "../component/Loading";
import {useAsync} from "react-async-hook";
import {useTemplateDispatch, useTemplateState} from "../TemplateContext";
import {isEmpty} from "../../util/typeUtile";
import TemplateList from "../component/TemplateList";
import '../style/TemplateList.css'
import {Async} from "../../util/apiUtil";
const TemplateListView = () => {
    // const [data,isPending,error] = useAsync(templateList);
    // const {list} = useTemplateState()
    // const dispatch = useTemplateDispatch();
    const {categoryNo,page} = useTemplateState()
    console.log(useTemplateState())
    const state = useAsync(templateList,[page,categoryNo]);
    // const containTemplate = (list) => {
    //     dispatch({type: 'ADDLIST', list: list})
    // }
    return(
            <TemplateList stateus={state.status} result={state.result}/>
    )


};
export default TemplateListView;
