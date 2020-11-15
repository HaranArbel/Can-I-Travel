import {useState} from "react";

export default function checkbox({isChecked, setIsChecked}) {

    return (
        <div>
            isChecked && (
            <img src={"./unchecked"} onClick={(event) => (setIsChecked(true))}/>
            )
            !isChecked && (
            <img src={"./checked"} onClick={(event) => (setIsChecked(false))}/>
            )
        </div>
    );

}


export default function impl() {

    const [isChecked, setIsChecked] = useState(false)

    return (
        <div>
            <checkbox isChecked={isChecked} setIsChecked={setIsChecked}/>
        </div>
    );

}