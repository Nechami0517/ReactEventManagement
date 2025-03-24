import { useState } from "react";

export const EditableField = (props: { value: any, setValue: Function }) => {
    const [edit, setEdit] = useState(false);

    const onBlur = (event: any) => {
        setEdit(false);
        props.setValue(event.target.value);
    }
    return <>
        {!edit && <h3 onClick={() => setEdit(true)}>{props.value}</h3>}
        {edit && <input type="text" defaultValue={props.value} onBlur={onBlur}/>}</>

}