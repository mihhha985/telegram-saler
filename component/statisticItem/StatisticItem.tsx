"use client"
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import styles from "./StatisticItem.module.scss";

function StatisticItem() {
	return ( 
		<Card
			variant="outlined" 
			className={styles.staticticItem}>
				<div className={styles.top}>
					<div>
						<Typography variant="subtitle1" mb={0}>Total orders <span>6.8%</span></Typography>
						<Typography variant="body2" mb={0}>Last 7 days</Typography>
					</div>
					<div>
						<Typography variant="h6" gutterBottom>16,247</Typography>
					</div>
				</div>
				<div className={styles.center}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<div className={styles.bottom}>
					<div>
						<span></span> 
						<Typography variant="body2">Completed</Typography>
						<Typography variant="body2" ml={"auto"}>52%</Typography>
					</div>
					<div>
						<span></span> 
						<Typography variant="body2">Panding payment</Typography>
						<Typography variant="body2" ml={"auto"}>48%</Typography>
					</div>
				</div>
		</Card>
	);
}

export default StatisticItem;