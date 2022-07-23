import { Button, Flex } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import ImageSlider from './components/ImageSlider';

export default function Home() {
	return (
		<div className={styles.container}>
			<ImageSlider />
		</div>
	);
}
