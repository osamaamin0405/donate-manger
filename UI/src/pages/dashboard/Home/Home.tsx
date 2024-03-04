import { Divider } from "antd";
import StatisticCardsSection from "./StatisticSection";
import { Helmet } from "react-helmet";
import AddCase from "../Case/AddCase";
import AllDonations from "../Fund/All";
import AllCases from "../Case/AllCases";
import { useState } from "react";

export default function Home() {
	const [ReranderCaseTabel, setRerenderCaseTabele] = useState(Math.random());
	return (
		<>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			<StatisticCardsSection/>
			<Divider/>
			<AddCase onCreateSuccess={()=>{
						setRerenderCaseTabele(Math.random());
			}}/>
			<Divider/>
			<AllCases key={ReranderCaseTabel}/>
			<Divider/>
			<AllDonations scroll={true}/>
		</>
	)
}