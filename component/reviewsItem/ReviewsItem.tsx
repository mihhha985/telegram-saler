"use client";
import {useState} from "react";
import {Card, Grid, Button} from '@mui/material';
import Rating from '@mui/material/Rating';
import './ReviewsItem.css';

function ReviewsItem({heandler}: {heandler: Function}) {

	const [isFull, setIsFull] = useState<boolean>(false);

	return ( 
		<Card 
			variant="outlined"
			className={isFull ? "scroll reviewsCard" : "reviewsCard"} 
			>
			<Grid display="flex" justifyContent="space-between">
				<div>
					<p>Я нашла работу</p>
					<Rating name="size-small" defaultValue={3} size="small" />
				</div>
				<div style={{textAlign:"right", color:"#8d8484"}}>
					<p>4 года назад</p>
					<p>Янусичка</p>
				</div>
			</Grid>
			<p className={isFull ? "croppedTextFull" : "croppedText"}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, animi asperiores sunt vero aut corrupti 
				culpa perspiciatis ex minima repudiandae commodi id explicabo dolore quod assumenda reprehenderit eos. Non, porro.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, animi asperiores sunt vero aut corrupti 
				culpa perspiciatis ex minima repudiandae commodi id explicabo dolore quod assumenda reprehenderit eos. Non, porro.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, animi asperiores sunt vero aut corrupti 
				culpa perspiciatis ex minima repudiandae commodi id explicabo dolore quod assumenda reprehenderit eos. Non, porro.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, animi asperiores sunt vero aut corrupti 
				culpa perspiciatis ex minima repudiandae commodi id explicabo dolore quod assumenda reprehenderit eos. Non, porro.
			</p>
			<Button 
				onClick={() => {
					setIsFull(prev => !prev);
					heandler(!isFull);
				}}
				sx={{float:"right"}} 
				variant="text">{isFull ? 'less' : 'more'}</Button>
		</Card>	
	);
}

export default ReviewsItem;