import React, { Component } from "react";
import { connect } from "react-redux";
import AlbumItem from "../../../application/models/AlbumItem";
import AlbumsList from "../../components/AlbumsList";
import Loading from "../../components/Loading";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { SortBy } from "../../../application/loaders";
import { getSortBy } from "../../../store/params";
import { AppState } from "../../../store/reducers/index";
import { bindActionCreators } from "redux";
import { loadAlbums } from "../../../store/actions/albumActions";

interface Props extends RouteComponentProps {
    loading: boolean;
    error: string | null;
    albums: AlbumItem[];

    page: number;
    next: boolean;

    loadAlbums: Function;
}

class DashboardComponent extends Component<Props> {
    private subscription: any;

    private load(next: boolean = false, sort: string = "top") {
        this.props.loadAlbums(next ? this.props.page : 0, sort);
    }

    private renderState() {
        const { loading, error, next } = this.props;

        if (loading) return <Loading>Loading Albums...</Loading>;
        if (error) return <p className="error centerer">Could not load the list ({error})</p>;
        if (next)
            return (
                <button
                    type="button"
                    className="btn btn--primary btn--block"
                    onClick={() => this.props.loadAlbums(this.props.page, getSortBy(this.props.location.search))}
                >
                    Load More
                </button>
            );
        return null;
    }

    constructor(props: Props) {
        super(props);
    }

    public state = { sortBy: SortBy.Top };

    public componentDidMount() {
        // TODO: Document how important it is to use History's Values
        this.subscription = this.props.history.listen(({ search }) => this.props.loadAlbums(0, getSortBy(search)));

        this.props.loadAlbums(0, getSortBy(this.props.location.search));
    }

    public componentWillUnmount() {
        this.subscription();
    }

    public render() {
        const albums = this.props.albums;
        const sortBy = getSortBy(this.props.location.search);

        const showing = String(sortBy === SortBy.Recent ? "Most Recent" : "Top Rated");

        return (
            <div>
                <h2 className="centerer">{showing} Albums</h2>

                <AlbumsList albums={albums} />
                {this.renderState()}
            </div>
        );
    }
}

const Dashboard = connect(
    ({
        albums: {
            albums: { state, error, loading },
            page,
            next
        }
    }: AppState) => ({ albums: state, error, loading, page, next }),
    dispatch => bindActionCreators({ loadAlbums }, dispatch)
)(DashboardComponent);

export default withRouter(Dashboard);
