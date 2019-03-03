import React, { Component } from "react";

interface Props {
    onSearch: (search: string) => any;
    onType: (search: string) => any; // Suggest
    items: string[];
}

interface State {
    search: string;
}

class Search extends Component<Props, State> {
    private submitSearch(value: string) {
        this.props.onSearch(value);
        this.setState(() => ({ search: "" }));
    }

    private checkSubmit(e: any) {
        if (e.keyCode === 13) this.submitSearch(e.target.value);
    }

    private handleInput(e: any) {
        const search = e.target.value;

        this.setState(() => ({ search }));
        this.props.onType(search);
    }

    public state = { search: "" };

    public render() {
        return (
            <div className="search">
                <input
                    type="search"
                    placeholder="Search"
                    className="search__input"
                    value={this.state.search}
                    onChange={this.handleInput.bind(this)}
                    onKeyUp={this.checkSubmit.bind(this)}
                />

                <ul className="search__items">
                    {this.props.items.map(item => (
                        <li onClick={() => this.submitSearch(item)} className="search__item" key={item}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Search;
