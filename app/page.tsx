"use client"
import { useRouter } from "next/navigation";
import {useState, useRef, RefObject, ChangeEvent} from "react";
import TopMenu from "@/component/topMenu/TopMenu";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import {Box, Grid, Button} from "@mui/material";
import {AiOutlinePaperClip} from "react-icons/ai";
import {IoMdCloseCircle} from "react-icons/io";
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { create } from "@/store/features/productSlice";
import { IProduct } from "@/types/productType";
const options = ['Windows', 'Linux', 'MacOS', 'Playstation', 'XBOX'];


export default function Home() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const {products} = useAppSelector(store => store.product);
	const inputFile = useRef() as RefObject<HTMLInputElement> 
	const [name, setName] = useState<string>('');
	const [nameError, setNameError] = useState<boolean>(false);
	const [description, setDescription] = useState<string>('');
	const [descriptionError, setDescriptionError] = useState<boolean>(false);
	const [price, setPrice] = useState<string>('');
	const [priceError, setPriceError] = useState<boolean>(false);
	const [categories, setCategories] = useState<string[]>([]);
	const [file, setFile] = useState<File | null>(null);
	const [fileError, setFileError] = useState<boolean>(false);

	const setNameHeandler = (value:string):void => {
		if(value.length < 100){
			setName(value);
			setNameError(false);
		}else{
			setNameError(true);
		}
	}

	const setDescriptionHeandler = (value:string):void => {
		if(value.length < 100){
			setDescription(value);
			setDescriptionError(false);
		}else{
			setDescriptionError(true);
		}
	}

	const setPriceHeandler = ():void => {
		let num = parseFloat(price);
		if(!isNaN(num) && num > 0){
			setPrice(num + '');
			setPriceError(false);
		}else{
			setPrice('');
			setPriceError(true);
		}
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

	const send = () => {
		const data:IProduct = {
			id: products.length + 1,
			name:name,
			description:description,
			price:+price,
			category:categories,
		};

		dispatch(create(data));
		setTimeout(() => {
			console.log(products);
			router.push('/product/' + data.id);
		}, 500);
	}

  return (
    <div className="layout">
			<TopMenu />	
			<Box
			sx={{width:"100%", height:"100%", mt:"40px"}}
      component="form"
      noValidate
      autoComplete="off">
				<Grid
					height="100%"
					rowGap="20px"
					display="flex"
					flexDirection="column">

					<TextField 
						value={name}
						onChange={e => setNameHeandler(e.target.value)}
						error={nameError}
						label="Name" 
						variant="outlined" 
						helperText={nameError ? "Максимум 100 символов" : ""}
					/>
					<TextField
						value={description}
						onChange={e => setDescriptionHeandler(e.target.value)}
						label="Description"
						variant="outlined"
						rows={4}
						multiline
						error={descriptionError}
						helperText={descriptionError ? "Максимум 100 символов" : ""}
					/>
					<TextField 
						value={price}
						onChange={e => setPrice(e.target.value)}
						onBlur={setPriceHeandler}
						label="Price" 
						variant="outlined"
						error={priceError}
						helperText={priceError ? "Любое положительное число" : ""} 
					/>
					<Autocomplete
						multiple
						options={options}
						value={categories}
						onChange={(event: any, newValue: any) => {
							setCategories(newValue);
						}}
						
						renderInput={(params) => (
							<TextField
								{...params}
								label="Categories"
							/>
						)}
					/>
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
					<Button
						onClick={send}
						sx={{mt:"auto"}} 
						variant="contained">
						Continue
					</Button>
					
				</Grid>
			</Box>
		</div>
  )
}
