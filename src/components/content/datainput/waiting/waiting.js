import React from 'react';
import M from 'materialize-css';
import wait from './wait.gif';
import './waiting.css';
export default function Waiting() {
    return <div id="waitingModal" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog theme" role="document">
            <div class="modal-content" >
                <div class="modal-header">
                    <h5 class="modal-title">Object Found</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => {
                        var waiting = M.Modal.init(document.getElementById('waitingModal'), {});
                        waiting.close();
                    }}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <img src={wait} style={{width:'100%'}} />
                    <div>Processing Image....</div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => {
                        var waiting = M.Modal.init(document.getElementById('waitingModal'), {});
                    }}>Close</button>
                </div>
            </div>
        </div>
    </div>
}