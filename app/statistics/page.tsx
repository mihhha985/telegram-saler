"use client"
import StatisticItem from "@/component/statisticItem/StatisticItem";
import styles from "./page.module.scss";

function Page() {
	return ( 
		<div className={styles.staticticBox}>
			<StatisticItem />
			<StatisticItem />
			<StatisticItem />
			<StatisticItem />
		</div>
	);
}

export default Page;