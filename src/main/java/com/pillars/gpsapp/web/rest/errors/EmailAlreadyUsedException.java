package com.pillars.gpsapp.web.rest.errors;

public class EmailAlreadyUsedException extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public EmailAlreadyUsedException() {
        super(ErrorConstants.EMAIL_ALREADY_USED_TYPE, "El email ingresado ya esta en uso", "userManagement", "emailexists");
    }
}
