/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { celebrate, Segments, Joi } from 'celebrate';

class AccountValidator {
	post() {
		celebrate({
			[Segments.BODY]: {
				name: Joi.string().min(2).required(),
				number: Joi.number().min(6).required(),
				balance: Joi.number().required(),
			},
		});
	}
	put() {
		celebrate({
			[Segments.BODY]: {
				name: Joi.string().min(2).required(),
				balance: Joi.number().required(),
			},
			[Segments.PARAMS]: {
				id: Joi.string().uuid().required(),
			},
		});
	}
	delete() {
		celebrate({
			[Segments.PARAMS]: {
				id: Joi.string().uuid().required(),
			},
		});
	}
	get() {
		celebrate({
			[Segments.PARAMS]: {
				id: Joi.string().uuid().required(),
			},
		});
	}
	list() {
		celebrate({
			[Segments.PARAMS]: {
				name: Joi.string(),
			},
		});
	}
}

export { AccountValidator };
