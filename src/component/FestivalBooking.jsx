import { MdHeight } from 'react-icons/md';
import festivaltrain from '../assets/newtrain.svg';

export default function FestivalBooking() {
    const festivalhead = {
        display: 'flex',
        gap: '.75rem',
        flexDirection: 'row',
        margin: '.75rem',
        textAlign: 'center',
        alignContent: 'normal'
    }
    const maincard = {
        backgroundColor: '#fcdfdfff',
        width: '100%',
        height: '150px',
    }
    return (
            <article className='festival-boking-container' style={{marginTop:'20px'}}>
            <div style={festivalhead}>
                    <img src={festivaltrain} alt="#" />
                    <div>
                    <div>Book trains for festival</div>
                    <div className='festival-subtext'>Book now to get confirmed ticket</div>
                    </div>
            </div>
            <div style={maincard}></div>
            </article>
        
    )
}