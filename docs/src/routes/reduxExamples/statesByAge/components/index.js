// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, TableRow, TableRowColumn, TableBody } from 'material-ui/Table';
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';
import MarkdownElement from 'docs/src/components/MarkdownElement';
import { updateSortOrder, updateTopCount, makeGetSelectedData } from '../module';
import { AGES } from '../module/constants';
import description from '../description.md';
import BarChart from './BarChart';

export class Example extends Component {
  state = {
    duration: 1000,
    showTop: this.props.showTop,
  }

  setDuration = (e, value) => {
    this.setState({
      duration: Math.floor(value * 10000),
    });
  }

  setShowTop = (e, value) => {
    this.setState({
      showTop: value,
    });
  }

  render() {
    const { sortKey, data, xScale, yScale, dispatch } = this.props;
    const { duration, showTop } = this.state;

    return (
      <Paper style={{ padding: 20 }}>
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <MarkdownElement text={description} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <h5>Show Top {showTop} States:</h5>
                <Slider
                  min={5}
                  max={25}
                  step={1}
                  value={showTop}
                  onChange={this.setShowTop}
                  onDragStop={() => dispatch(updateTopCount(showTop))}
                />
              </div>
              <div className="col-md-6 col-sm-6">
                <h5>Transition Duration: {(duration / 1000).toFixed(1)} Seconds</h5>
                <Slider
                  defaultValue={0.1}
                  onChange={this.setDuration}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 col-sm-3">
                <Table
                  wrapperStyle={{ width: '100%' }}
                  selectable={false}
                  onCellClick={(d) => dispatch(updateSortOrder(AGES[d]))}
                >
                  <TableBody displayRowCheckbox={false}>
                    {AGES.map((age) => {
                      const color = sortKey === age ? 'rgba(51,51,51,0.1)' : 'transparent';

                      return (
                        <TableRow
                          key={age}
                          style={{ backgroundColor: color }}
                        >
                          <TableRowColumn>{age}</TableRowColumn>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              <div className="col-md-9 col-sm-9" style={{ padding: 0 }}>
                <BarChart
                  data={data}
                  xScale={xScale}
                  yScale={yScale}
                  duration={duration}
                />
              </div>
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

Example.propTypes = {
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  showTop: PropTypes.number.isRequired,
  sortKey: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const makeMapStateToProps = () => {
  const getSelectedData = makeGetSelectedData();
  const mapStateToProps = (state) => {
    return getSelectedData(state);
  };
  return mapStateToProps;
};


export default connect(makeMapStateToProps())(Example);
