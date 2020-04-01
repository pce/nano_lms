


build: 
	yarn build
	rm -r ../nano_lms_api/public/*
	mv build/* ../nano_lms_api/public/


.PHONY: build
