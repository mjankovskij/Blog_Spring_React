import React from 'react';
import {Link, Box} from '@mui/material';

export default class Footer extends React.Component {
    render() {
        return (<Box sx={{flexGrow: 1, mt: 2, p: 2, textAlign: 'center'}}
                     style={{backgroundColor: '#292929', color: '#c7c7c7'}}>
                <Link color="white" href="http://jankovskij.lt/" underline="none">
                    © marek@jankovskij.lt
                </Link>
            </Box>
        )
    }
}