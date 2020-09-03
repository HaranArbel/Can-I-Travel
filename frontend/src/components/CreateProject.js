import React, {useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form"
import MultiSelect from "react-multi-select-component"

export default function CreateProject(){
    //
    // const [state, setState] = React.useState({
    //     name: "",
    //     employees: ""
    //   })
    //
    // const handleSubmit = () => console.log(state)
    //
    // function handleChange(evt) {
    //     const value = evt.target.value;
    //         setState({
    //             ...state,
    //             [evt.target.name]: value
    //       });
    // }
    const history = useHistory();
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = async (body) => {
        console.log(body)
        const response = await fetch(`/create_project`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const responseData = await response.json();
        history.push("/projects");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              name="projectName"
              placeholder="project name"
              ref={register}
            />
            <input
              type="text"
              name="employee"
              placeholder="employee"
              ref={register}
            />
            {/*<select name="category" onChange={this.handleChange}>*/}
            {/*  {Object.keys(this.state.categories).map(id => {*/}
            {/*      return (*/}
            {/*        <option key={id} value={id}>{this.state.categories[id]}</option>*/}
            {/*      )*/}
            {/*    })}*/}

      {/*          <h1>Select Fruits</h1>*/}
      {/*<pre>{JSON.stringify(selected)}</pre>*/}
      {/*<MultiSelect*/}
      {/*  options={options}*/}
      {/*  value={selected}*/}
      {/*  onChange={setSelected}*/}
      {/*  labelledBy={"Select"}*/}
      {/*/>*/}
      {/*      </select>*/}
            <input type="submit"/>
        </form>
    );

};
