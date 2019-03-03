import React, { Component } from "react";

interface Position {
    x: number;
    start: number;
    end: number;
}

interface Props {
    totalTime: number;
    currentTime: number;
    isActive: boolean;

    onChange(time: number): any;
    onDragging(dragging: boolean): any;
}

interface State {
    isDragging: boolean;
}

class ProgressBar extends Component<Props, State> {
    private static readonly ARROW = 5;
    private static readonly EDGE = 20;

    private subscription: any;
    private bar: HTMLDivElement | null = null;

    private setPosition({ x, start, end }: Position) {
        if (x >= end) return this.props.onChange(this.props.totalTime);
        if (x <= start) return this.props.onChange(0);

        const percentage = (x - start) / (end - start);
        const newTime = Math.ceil(percentage * this.props.totalTime);
        this.props.onChange(newTime);
    }

    private onMouseMove(e: MouseEvent) {
        if (!this.props.isActive || !this.state.isDragging) return;
        if (!this.bar) throw new Error("HTML DOM Error");

        const rect = this.bar.getBoundingClientRect();

        const x = e.x - ProgressBar.ARROW,
            y = e.y;
        const start = rect.left,
            end = rect.left + rect.width;

        if (x >= end || x <= start || y > rect.bottom + ProgressBar.EDGE || y < rect.top - ProgressBar.EDGE)
            this.setDragging(false);

        this.setPosition({ x, start, end });
    }

    private setDragging(isDragging: boolean) {
        if (!this.props.isActive) return;

        this.props.onDragging(isDragging);
        this.setState(() => ({ isDragging }));
    }

    private getX() {
        const { totalTime, currentTime } = this.props;

        return String((currentTime / totalTime) * 100) + "%";
    }

    constructor(props: Props) {
        super(props);

        this.subscription = this.onMouseMove.bind(this);
    }

    public state = { isDragging: false };

    public componentDidMount() {
        window.addEventListener("mousemove", this.subscription);
    }

    public componentWillUnmount() {
        window.removeEventListener("mousemove", this.subscription);
    }

    public render() {
        return (
            <div className="progress" ref={div => (this.bar = div)}>
                <button
                    className={`progress__btn ${this.props.isActive ? "progress__btn--active" : ""}`}
                    onMouseDown={this.setDragging.bind(this, true)}
                    onMouseUp={this.setDragging.bind(this, false)}
                    style={{ left: this.getX() }}
                />
            </div>
        );
    }
}

export default ProgressBar;
