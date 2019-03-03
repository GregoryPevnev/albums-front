import React, { Component } from "react";
import { connect } from "react-redux";
import AlbumItem from "../../../application/models/AlbumItem";
import AlbumsList from "../../components/AlbumsList";
import Loading from "../../components/Loading";
import { RouteComponentProps } from "react-router-dom";
import { getSearch } from "../../../store/params";
import { AppState } from "../../../store/reducers/index";
import { bindActionCreators } from "redux";
import { searchAlbums } from "../../../store/actions/searchActions";

interface Props extends RouteComponentProps {
    loading: boolean;
    error: string | null;
    albums: AlbumItem[];

    searchAlbums: Function;
}

class SearchListComponent extends Component<Props> {
    private subscription: any;

    private search(query: string) {
        const term = getSearch(query);
        this.props.searchAlbums(term);
    }

    constructor(props: Props) {
        super(props);
    }

    public state = { search: "" };

    public componentDidMount() {
        this.search(this.props.location.search);

        // TODO: Document how important it is to use History's Values
        this.subscription = this.props.history.listen(({ search }) => this.search(search));
    }

    public componentWillUnmount() {
        this.subscription();
    }

    public render() {
        const { albums, error, loading } = this.props;
        const search = getSearch(this.props.location.search);

        return (
            <div>
                <h2 className="centerer">{search ? `Results for "${search}"` : "No query"}</h2>
                <AlbumsList albums={albums} />
                {loading ? (
                    <Loading>Loading Results...</Loading>
                ) : (
                    error && <p className="error centerer">Could not load the list ({error})</p>
                )}
            </div>
        );
    }
}

const SearchList = connect(
    ({
        search: {
            results: { state, loading, error }
        }
    }: AppState) => ({ albums: state, loading, error }),
    dispatch => bindActionCreators({ searchAlbums }, dispatch)
)(SearchListComponent);

export default SearchList;
