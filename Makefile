
install:
	@npm install --registry=http://registry.cnpmjs.org --cache=${HOME}/.npm/.cache/cnpm

autod: install
	@./node_modules/.bin/autod -w
	@$(MAKE) install

.PHONY: install autod
