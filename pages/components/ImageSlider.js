import React, { useEffect, useRef, useState } from 'react';
import styles from './Styles.module.css';
import * as faceapi from 'face-api.js';

const ImageSlider = () => {
	const [image, setImage] = useState('/img1.jpg');
	const imgRef = useRef();
	const [faces, setFaces] = useState([]);
	const [match, setMatch] = useState('processing...');

	const handleImage = async () => {
		setMatch('processing...');
		const detections = await faceapi
			.detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
			.withFaceLandmarks()
			.withFaceDescriptors();

		setFaces(detections);
		console.log(detections);

		const maxDescriptorDistance = 0.6;

		if (!detections.length) {
			return;
		}

		// if (detections.length != 2) {
		// 	return;
		// }

		//const faceMatcher = new faceapi.FaceMatcher(detections);
		//console.log(JSON.stringify(faceMatcher));
		//const bestMatch = faceMatcher.findBestMatch(faceMatcher);

		//console.log(bestMatch.toString);

		const similarityMatch = await faceapi.euclideanDistance(
			detections[0].descriptor,
			detections[1].descriptor
		);
		//console.log(similarityMatch);

		setMatch(similarityMatch > 0.6 ? 'Did Not Match' : 'Matched');
	};

	useEffect(() => {
		handleImage();
	}, [image]);

	useEffect(() => {
		const loadModels = () => {
			Promise.all([
				faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
				faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
				faceapi.nets.faceExpressionNet.loadFromUri('/models'),
				faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
				faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
				//	faceapi.nets.tinyYolov2.loadFromUri('/models'),

				// await faceapi.loadMtcnnModel('/models')
				// await faceapi.loadFaceLandmarkModel('/models')
				// await faceapi.loadFaceLandmarkTinyModel('/models')
				// await faceapi.loadFaceRecognitionModel('/models')
				// await faceapi.loadFaceExpressionModel('/models')

				//faceapi.nets.loadFaceRecognitionModel.loadFromUri('/models'),
			])
				.then(handleImage)
				.catch(e => console.log(e));
		};

		imgRef.current && loadModels();
	}, []);

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.images}>
					<img src='/img1.jpg' alt='..' onClick={() => setImage('/img1.jpg')} />
					<img src='/img2.jpg' alt='..' onClick={() => setImage('/img2.jpg')} />
					<img src='/img3.jpg' alt='..' onClick={() => setImage('/img3.jpg')} />
					<img src='/img4.jpg' alt='..' onClick={() => setImage('/img4.jpg')} />
					<img src='/img5.jpg' alt='..' onClick={() => setImage('/img5.jpg')} />
					<img src='/img6.jpg' alt='..' onClick={() => setImage('/img6.jpg')} />
					<img src='/img7.jpg' alt='..' onClick={() => setImage('/img7.jpg')} />
					<img src='/img8.jpg' alt='..' onClick={() => setImage('/img8.jpg')} />
					<img src='/img9.jpg' alt='..' onClick={() => setImage('/img9.jpg')} />
					<img
						src='/img10.jpg'
						alt='..'
						onClick={() => setImage('/img10.jpg')}
					/>
					<img
						src='/img11.jpg'
						alt='..'
						onClick={() => setImage('/img11.jpg')}
					/>
					<img
						src='/img12.jpg'
						alt='..'
						onClick={() => setImage('/img12.jpg')}
					/>
				</div>
				<div className={styles.selected}>
					<img src={image} alt='..' ref={imgRef} />
				</div>
			</div>
			<div className={styles.details}>
				<h2>Image Details</h2>
				<p>Selected Image: {image}</p>
				<p>Total Faces Detected: {faces?.length ? faces.length : 0}</p>
				<p>Match: {match}</p>
			</div>
		</div>
	);
};

export default ImageSlider;
