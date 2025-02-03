import {
    constValues,
    messges,
    first50Letters,
    generateDiv,
    generateCheckBox,
    generateRule,
} from './utils.js';
document['addEventListener']('DOMContentLoaded', () => {
    const _0x2749f2 = document['getElementById'](constValues['FETCH_BUTTON']);
    const _0x4b49b1 = document['getElementById'](constValues['DOWNLOAD_BUTTON']);
    const _0x277a96 = document['getElementById'](constValues['SELECTION_AREA']);
    const _0x1339ae = document['getElementById'](constValues['NOTIFY_MESSAGE']);
    let _0x5c9a6d = -0x1;
    let _0x5bb739 = constValues['empty'];



    function _0x33bcfb() {
        _0x5c9a6d = -0x1;
        _0x5bb739 = constValues['empty'];

        _0x277a96['innerHTML'] = constValues['empty'];
    }
    function _0x1bee48(_0x58923f) {

        _0x1339ae['innerText'] = _0x58923f;
    }
    function _0x252705() {
        //
        const _0x4c8a27 = document.querySelectorAll('div[class="fbb737a4"]');
        const _0xa28e60 = document.querySelectorAll('div[class="ds-markdown ds-markdown--block"]');
        let _0x505bf9 = [];
        _0x4c8a27['forEach']((_0x3e1b14, _0x43ac27) => {
            const _0x34c22c = _0x3e1b14['innerHTML'];
            const _0xaa4358 = _0xa28e60[_0x43ac27] ? _0xa28e60[_0x43ac27]['innerHTML'] : '';
            _0x505bf9['push']({
                'question': _0x34c22c['trim'](),
                'answer': _0xaa4358['trim']()
            });
        });
        return _0x505bf9;
    }
    function _0x2c18bb(_0x3cb5ea, _0x258c53) {
        let _0x299a6e = document['createElement'](constValues['style']);
        _0x299a6e['type'] = constValues['textCss'];
        document['head']['appendChild'](_0x299a6e);
        let _0x28c6d8 = generateRule(_0x3cb5ea, _0x258c53);
        _0x299a6e['sheet']['insertRule'](_0x28c6d8, 0x0);
    }
    function _0x254d9f() {
        _0x2c18bb(constValues['chatQuery'], constValues['cssQuery']);
        _0x2c18bb(constValues['chatAnswer'], constValues['cssAnswer']);
    }
    _0x254d9f();
    _0x2749f2['addEventListener']('click', () => {
        _0x1bee48(messges['CLEAR']);
        // _0x4eab2c(_0x277a96, 'checkBoxContainer', 'fetchBtn->click');
        _0x277a96['innerHTML'] = constValues['empty'];
        chrome['tabs']['query']({
            'active': !![],
            'currentWindow': !![]
        }, _0xe4d90d => {
            const _0x557444 = constValues['deepSeekLink'];
            // _0x549eca(_0x557444);
            if (_0xe4d90d && _0xe4d90d['length'] > 0x0) {
                const _0x5d3806 = _0xe4d90d[0x0];
                // _0x549eca(_0x5d3806);
                const _0x15cfb1 = _0x5d3806['id'];
                const _0x2bb5f7 = _0x5d3806['url'];
                _0x5c9a6d = _0x15cfb1;
                if (_0x2bb5f7['substring'](0x0, _0x557444['length']) == _0x557444) {
                    _0x5bb739 = first50Letters(_0x5d3806['title']);
                    // _0x549eca('Bfore\x20Fetch\x20chat');
                    _0x1e0fa9();
                } else {
                    console['error']('Not\x20deepseek\x20chat\x20url.');
                }
            } else {
                console['error']('Tabs\x20issue.');
            }
        });
        function _0x1e0fa9() {
            let _0x5e6027 = [];
            // _0x549eca('g_TabID\x20is\x20' + _0x5c9a6d);
            chrome['scripting']['executeScript']({
                'target': { 'tabId': _0x5c9a6d },
                'function': _0x252705
            }, _0x355658 => {
                // _0x549eca(_0x355658);
                if (chrome['runtime']['lastError']) {
                    _0x1bee48(messges['FAILED_FETCH']);
                    return;
                } else {
                    // _0x549eca('No\x20error');
                }
                if (_0x355658 && _0x355658[0x0]['result']) {
                    _0x5e6027 = _0x355658[0x0]['result'];
                    _0x5e6027['forEach']((_0x251a54, _0x3764ea) => {
                        const _0x19fbf0 = document['createElement']('div');
                        _0x19fbf0['innerHTML'] = generateCheckBox(_0x3764ea, _0x251a54['question']);
                        _0x277a96['appendChild'](_0x19fbf0);
                    });
                } else {
                    console['error']('Nothing\x20to\x20render');
                }
            });
        }
    });
    _0x4b49b1['addEventListener']('click', () => {
        _0x1bee48(messges['CLEAR']);
        const _0xe84535 = document['querySelectorAll'](constValues['SELECTED_CHOICES']);
        // _0x4eab2c(_0xe84535, 'checked', 'downloadButton->click');
        if (_0xe84535['length'] == 0x0) {
            _0x1bee48(messges['NO_SELECTION']);
            return;
        }
        _0x2c10c0(_0xe84535);
    });
    function _0x2c10c0(_0x38fcbe) {
        let _0x4013d0 = [];
        let _0x69d35 = [];
        for (let _0x30d263 = 0x0; _0x30d263 < _0x38fcbe['length']; _0x30d263++)
            _0x69d35['push'](parseInt(_0x38fcbe[_0x30d263]['name']['substring'](0x3)));
        chrome['scripting']['executeScript']({
            'target': { 'tabId': _0x5c9a6d },
            'function': _0x252705
        }, _0x5acdf5 => {
            if (chrome['runtime']['lastError']) {
                _0x1339ae['innerText'] = messges['FAILED_FETCH'];
                return;
            } else {
                // _0x549eca('no\x20issue');
            }
            let _0x3e8112 = document['createElement']('div');
            let _0x363877 = constValues['chatQuery'];
            let _0xfc8ad1 = constValues['chatAnswer'];
            if (_0x5acdf5 && _0x5acdf5[0x0]['result']) {
                _0x4013d0 = _0x5acdf5[0x0]['result'];
                _0x4013d0['forEach']((_0x364bba, _0x262622) => {
                    if (_0x69d35['includes'](_0x262622)) {
                        let _0x5a29b0 = '';
                        if (_0x364bba['question']) {
                            _0x5a29b0 += generateDiv(_0x363877, _0x364bba['question']);
                        }
                        if (_0x364bba['answer']) {
                            _0x5a29b0 += generateDiv(_0xfc8ad1, _0x364bba['answer']);
                        }
                        const _0x34c394 = document['createElement']('div');
                        _0x34c394['innerHTML'] = _0x5a29b0;
                        _0x3e8112['appendChild'](_0x34c394);
                    }
                });
                _0x1bee48(messges['CLEAR']);
                _0x3e8112['querySelectorAll'](constValues['classesToRemove'])['forEach'](_0x55110c => _0x55110c['remove']());
                _0x1bee48(messges['DOWNLOADING']);
                const _0x2f7322 = {
                    'margin': 0x1,
                    'filename': _0x5bb739 + '.pdf',
                    'image': {
                        'type': 'jpeg',
                        'quality': 0.95
                    },
                    'html2canvas': { 'scale': 0x2 },
                    'enableLinks': !![],
                    'jsPDF': {
                        'unit': 'in',
                        'format': 'letter',
                        'orientation': 'portrait'
                    },
                    'pagebreak': {
                        'mode': 'avoid-all',
                        'before': '#page2el'
                    }
                };
                html2pdf()['set'](_0x2f7322)['from'](_0x3e8112)['save']();
                _0x33bcfb();
            }
        });
    }
});