import React from 'react';
import M from 'materialize-css';
export default function Output(props) {
    return <div id="outputModal" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Object Found</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => {
                        var output = M.Modal.init(document.getElementById('outputModal'), {});
                        output.close();
                    }}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <table>
                        <thead>
                            <tr>
                                <th>Name : Probability</th>
                                {console.log(props.result)}
                            </tr>
                            <tr>
                                {
                                    props.result.map((object)=>{
                                        let keys = Object.keys(object);
                                        // console.log(keys);
                                        return<td>{keys}: {object[keys]}%</td>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody id="targetObject">

                        </tbody>
                    </table>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => {
                        var output = M.Modal.init(document.getElementById('outputModal'), {});
                        output.close()
                    }}>Close</button>
                </div>
            </div>
        </div>
    </div>

}