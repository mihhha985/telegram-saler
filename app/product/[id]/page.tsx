"use client"
import { useState, useRef, useMemo, RefObject, ChangeEvent } from "react";
import { useRouter } from 'next/navigation';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {Skeleton } from '@mui/material';
import {CiEdit} from "react-icons/ci";
import {BsPlusCircleFill} from "react-icons/bs";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import {Box, Grid} from "@mui/material";
import {AiOutlinePaperClip} from "react-icons/ai";
import Typography from '@mui/material/Typography';
import {IoMdCloseCircle} from "react-icons/io";
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ReviewsItem from "@/component/reviewsItem/ReviewsItem";
import {typeOrderStatus} from "@/types/orderType";
import { useAppSelector } from "@/store/hooks";
import cn from "classnames";
import styles from "./page.module.scss";

export default function Page({ params }: { params: { id: string } }) {
	const router = useRouter();
	const {products} = useAppSelector(store => store.product);
	const inputFile = useRef() as RefObject<HTMLInputElement> 
	const [status, setStatus] = useState<typeOrderStatus>(typeOrderStatus['Not Active']);
	const [reviewsHidden, setReviewsHidden] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const [file, setFile] = useState<File | null>(null);
	const [fileError, setFileError] = useState<boolean>(false);
	

	let product = useMemo(() => products.find(item => item.id === +params.id), [products]);
	let category = useMemo(() => {
		if(product && product.category.length > 0){
			return product.category;
		}

		return false;
	}, [product])

	const hendlerStatus = ():void => {
		if(status === typeOrderStatus['Not Active']) 
			setStatus(typeOrderStatus.Active);
		if(status === typeOrderStatus.Active) 
			setStatus(typeOrderStatus['Not Active']);
	}
	
	const setFileHeandler = (e:ChangeEvent<HTMLInputElement>) => {
		if(e.target && e.target.files){
			let file = e.target.files[0];
			if(file.type === "text/plain" || file.type === "text/csv"){
				setFile(file);
				setFileError(false);
			}else{
				setFileError(true);
			}
		}
	}
	
  return(
		<>
			<div className={styles.productContainer}>
				<div className={styles.itemBox}>
					<div className={styles.imageBox}>
						<Skeleton
							sx={{position:"absolute", top:0, left:0}} 
							variant="rectangular" 
							width={121} 
							height={155} 
						/>
					</div>
					<div className={styles.itemCaption}>
						<Button
							onClick={() => router.push("/product/edit/" + params.id)} 
							className={styles.editBox}>
							<CiEdit />
						</Button>
						<p>&#36;{product?.price}</p>
						<p>{product?.name}</p>
						<div className={styles.raitingBox}>
							<Rating name="size-small" defaultValue={3} size="small" />
							<h6>1987 reviews</h6>
						</div>
						<p>Sells: 2</p>
						<h4>Seller: Groovy</h4>
						<div className={cn("orderStatus", {
							"orderConfirmed": status === typeOrderStatus.Active,
							"orderNotConfirmed": status === typeOrderStatus['Not Active'],
							"orderDispute": status === typeOrderStatus.Dispute || status === typeOrderStatus.Empty,
							"orderClosed": status === typeOrderStatus.Panding
						})}>			
							{status === typeOrderStatus.Active && <CheckIcon fontSize="inherit"/>} 
							{status === typeOrderStatus['Not Active'] && <AccessTimeRoundedIcon fontSize="inherit"/>}
							{status === typeOrderStatus.Panding && <AccessTimeRoundedIcon fontSize="inherit"/>}
							{status === typeOrderStatus.Empty && <ClearIcon fontSize="inherit"/>} 
							{status === typeOrderStatus.Dispute && <ClearIcon fontSize="inherit"/>} 
							<span style={{textTransform:"uppercase", whiteSpace:"nowrap" }}>{status}</span>
						</div>
					</div>
				</div>
				<div className={styles.descriptinBox}>
					<h4>Description</h4>
					<p>{product?.description}</p>
				</div>
				<div className={styles.categoryBox}>
					<h4>Categories</h4>
					<div className={styles.categoryItems}>
						{category === false
							?
								<span></span>
							:
							<>
							{category.map(item => <span key={item}>{item}</span>)}
							</>
						}
					</div>
				</div>
				<div className={styles.buttonContainer}>
					<Button 
						onClick={hendlerStatus}
						variant="contained">
						<BsPlusCircleFill />
						<span>
							{status === typeOrderStatus.Active && 'Deactivate lot'}
							{status === typeOrderStatus['Not Active'] && 'Activate lot'}
						</span>
					</Button>
					<Button 
						onClick={() => setOpen(true)}
						variant="contained">
						<BsPlusCircleFill />
						<span>Load Items</span>
					</Button>
					<Button
						variant="contained">
						<BsPlusCircleFill />
						<span>Chat</span>
						<span className={styles.marker}>2</span>
					</Button>
					<Button 
						color="error"
						variant="contained">
						<BsPlusCircleFill />
						<span>Delete lot</span>
					</Button>
				</div>
				<h4 style={{marginTop:"15px"}}>Reviews</h4>
				<div className={cn(styles.reviewsBox, {[styles.hidden]: reviewsHidden})}>
					<div className={styles.reviewsContainer}>
						<ReviewsItem heandler={setReviewsHidden} />
						<ReviewsItem heandler={setReviewsHidden} />
						<ReviewsItem heandler={setReviewsHidden} />
						<ReviewsItem heandler={setReviewsHidden} />
					</div>	
				</div>	
			</div>
			<Dialog onClose={() => setOpen(false)} open={open}>
      	<DialogTitle>Set backup account</DialogTitle>
				<Box> 
					<Grid 
						sx={{border: "dotted 3px #ccc"}}
						alignItems="center"
						justifyContent="center"
						height="80px"
						width="100%"
						display="flex">
						<Button
							onClick={() => inputFile.current?.click()}
							variant="text">
							<AiOutlinePaperClip />
							<span>Выбрать файлы</span>
						</Button>	
						<input 
							onChange={e => setFileHeandler(e)}
							ref={inputFile} 
							type="file" 
							style={{display:"none"}}
						/>
					</Grid>
					{(file && !fileError)
						?
							<Grid
								columnGap="10px" 
								display="flex">
								<Typography variant="caption" display="block" gutterBottom>
									{file.name}
								</Typography>
								<IoMdCloseCircle 
									onClick={() => setFile(null)}
									color="#8d8484"/>
							</Grid>
						:
							<Typography
								variant="caption" 
								display="block" 
								gutterBottom>
								{fileError
									?
										<span style={{color:"red"}}>wrong file format</span>
									:
										<span>Допустимые форматы файла <b>.txt</b> <b>.csv</b></span>
								}
							</Typography>
					}
				</Box>	
    	</Dialog>
		</>
	)
}