import React from "react";

type FormProps = {
    addTask: (name: string) => void
};

type FormState = {
    name: string
};

export class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        this.state = {
            name: "hoge"
        };
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.addTask(this.state.name);
        this.setState({name: ""});
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        this.setState({
            name: e.target.value
        });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2 className="label-wrapper">
                    <label htmlFor="new-todo-input" className="label__lg">
                        What needs to be done?
                    </label>
                </h2>
                <input
                    type="text"
                    id="new-todo-input"
                    className="input input__lg"
                    name="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                    autoComplete="off"
                />
                <button type="submit" className="btn btn__primary btn">
                    Add
                </button>
            </form>
        );
    }
}
