"use client"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TopMenu from "@/component/topMenu/TopMenu";
export default function Template({ children }: { children: React.ReactNode }) {

	const pathname = usePathname();
	const [visible, setVisible] = useState<boolean>(true);

	useEffect(() => {
		const regexp1 = /\/product\/[0-9]+/
		const regexp2 = /\/product\/edit\/[0-9]+/
		if(pathname && pathname.search(regexp2) !== -1){
			setVisible(true);
		}else{
			if(pathname.search(regexp1) !== -1) setVisible(false);
		}
	});

  return (
		<div className="layout">
			{visible && <TopMenu />}
			<div className="content">
				{children}
			</div>
		</div>
	)
}