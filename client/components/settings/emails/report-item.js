import React from 'react';
import { connect } from 'react-redux';

import { assert, assertHas, translate as $t } from '../../../helpers';
import { actions } from '../../../store';

import ConfirmDeleteModal from '../../ui/confirm-delete-modal';

const ReportItem = props => {

    const handleOnSelectChange = event => {
        let newValue = event.target.value;
        if (newValue === props.alert.order)
            return;

        props.update({ frequency: newValue });
    };

    let { account, alert } = props;

    assertHas(alert, 'frequency');
    assert(alert.type === 'report');

    return (
        <tr>
            <td className="col-md-3">{ account.title }</td>
            <td className="col-md-3">
                <span className="condition">
                    { $t('client.settings.emails.send_report') }
                </span>
            </td>
            <td className="col-md-5 frequency">
                <select
                  className="form-control pull-right"
                  defaultValue={ alert.frequency }
                  onChange={ handleOnSelectChange }>
                    <option value="daily">
                        { $t('client.settings.emails.daily') }
                    </option>
                    <option value="weekly">
                        { $t('client.settings.emails.weekly') }
                    </option>
                    <option value="monthly">
                        { $t('client.settings.emails.monthly') }
                    </option>
                </select>
            </td>
            <td className="col-md-1">
                <span
                  className="pull-right fa fa-times-circle"
                  aria-label="remove"
                  data-toggle="modal"
                  data-target={ `#confirmDeleteAlert${alert.id}` }
                  title={ $t('client.settings.emails.delete_report') }
                />

                <ConfirmDeleteModal
                  modalId={ `confirmDeleteAlert${alert.id}` }
                  modalBody={ $t('client.settings.emails.delete_report_full_text') }
                  onDelete={ props.handleDelete }
                />
            </td>
        </tr>
    );
};

ReportItem.propTypes = {
    // The alert
    alert: React.PropTypes.object.isRequired,

    // The account for which the alert is configured
    account: React.PropTypes.object.isRequired,

    // The alert update function
    update: React.PropTypes.func.isRequired,

    // The alert deletion function
    handleDelete: React.PropTypes.func.isRequired
};

export default connect(() => {
    return {};
}, (dispatch, props) => {
    return {
        update(newFields) {
            actions.updateAlert(dispatch, props.alert.id, newFields);
        },
        handleDelete() {
            actions.deleteAlert(dispatch, props.alert.id);
        }
    };
})(ReportItem);
