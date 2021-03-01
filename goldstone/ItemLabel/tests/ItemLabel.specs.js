import React from 'react';
import {shallow, mount} from 'enzyme';

import ItemLabel from '../ItemLabel';
import css from '../ItemLabel.module.less';

describe('ItemLabel', () => {

    it('Renders list items labels', function () {
        const expected = [{name:'Item Label', secondary:'Secondary Text',icon:'', disabled:false},
        {name:'Item Label', secondary:'',icon:'', disabled:true},
        {name:'Item Label', secondary:'',icon:'',  disabled:false},
        {name:'Item Label', secondary:'Secondary Text',icon:'', disabled:true}
        ];
        const itemLabel = mount(<ItemLabel items={expected} />);
        const actual = itemLabel.find('ItemLabel').prop('items');
        expect(actual).toBe(expected);
        
	});
	
});
