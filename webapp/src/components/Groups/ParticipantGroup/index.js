import React from 'react';
import { Table, TableBody, TableRow,
  TableHeader, TableHeaderColumn, TableRowColumn } from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import UpArrow from 'react-icons/lib/md/keyboard-arrow-up';
import DownArrow from 'react-icons/lib/md/keyboard-arrow-down';
import IconButton from 'material-ui/IconButton/IconButton';

class ParticipantGroup extends React.PureComponent {
  render() {
    const { promotedPlayers = {}, playerList = [] } = this.props;
    return (<div style={{ position: 'relative' }} className="participant-group-tables">
      <Table
        selectable={false}
        multiSelectable={false}
        fixedHeader={Boolean(true)}
      >
        <TableHeader
          displaySelectAll={false}
          enableSelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn>Group {this.props.groupId + 1}</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Rating</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          showRowHover={Boolean(true)}
          style={{ position: 'relative' }}
        >
          {
            this.props.players.map((player = {}, i) => (
              <TableRow className="table-row" key={player.id}>
                <TableRowColumn
                  style={{ color: promotedPlayers[player.id] ? 'rgb(255, 64, 129)' : 'default' }}
                >
                  {i + 1}
                </TableRowColumn>
                <TableRowColumn
                  style={{ color: promotedPlayers[player.id] ? 'rgb(255, 64, 129)' : 'default' }}
                >
                  <SelectField
                    name="player-selector"
                    onChange={(e, idx, val) => this.props.swapPlayers(this.props.groupId, i, val)}
                    style={{ marginRight: '40px' }}
                    listStyle={{ height: '52px' }}
                    hintStyle={{ height: '52px' }}
                    value={player.id}
                  >
                    <MenuItem key={player.id} value={player.id} primaryText={player.name} />
                    {
                      playerList.filter((g, k) => k !== this.props.groupId).map(group => (
                        group.map((swapee = {}) => (
                          <MenuItem key={swapee.id} value={swapee.id} primaryText={swapee.name} />
                        ))
                      ))
                    }
                  </SelectField>
                </TableRowColumn>
                <TableRowColumn
                  style={{ color: promotedPlayers[player.id] ? 'rgb(255, 64, 129)' : 'default' }}
                >
                  {player.rating}
                </TableRowColumn>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      {
        !!this.props.moveUp &&
          (<IconButton
            iconClassName="material-icons"
            tooltip="Shift one player up"
            onClick={() => this.props.moveUp(this.props.groupId)}
            style={{
              position: 'absolute',
              left: '30px',
              top: '57px',
              zIndex: 10,
            }}
          >
            <UpArrow />
          </IconButton>)
      }
      {
        !!this.props.moveDown &&
          (<IconButton
            iconClassName="material-icons"
            tooltip="Shift one player down"
            onClick={() => this.props.moveDown(this.props.groupId)}
            style={{
              position: 'absolute',
              left: '30px',
              bottom: '1px',
              zIndex: 10,
            }}
          >
            <DownArrow />
          </IconButton>)
      }
    </div>);
  }
}

export default ParticipantGroup;
