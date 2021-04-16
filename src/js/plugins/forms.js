import Vue from 'vue'
import axios from 'axios'

class Class
{
    /**
     * [constructor description]
     *
     * @param {[type]} formData [description]
     */
    constructor( formData ) {
        for (const [key, value] of Object.entries(formData)) {
            this[key] = value
        }

        this.errors = []
    }

    /**
     * [post description]
     *
     * @param  {[type]}  url [description]
     * @return {Promise}     [description]
     */
    async post( url ) {
        await axios.post(url, this).then(response => {
            this.saveResponse( response.response ?? response )
        }).catch(error => {
            this.saveResponse( error.response )
        })

        return this
    }

    /**
     * [patch description]
     *
     * @param  {[type]}  url [description]
     * @return {Promise}     [description]
     */
    async patch( url ) {
        await axios.patch(url, this).then(response => {
            this.saveResponse( response.response ?? response )
        }).catch(error => {
            this.saveResponse( error.response )
        })

        return this
    }

    /**
     * [get description]
     *
     * @param  {[type]}  url [description]
     * @return {Promise}     [description]
     */
    async get( url ) {
        await axios.get(url + '?' + new URLSearchParams(this).toString(), this).then(response => {
            this.saveResponse( response.response ?? response )
        }).catch(error => {
            this.saveResponse( error.response )
        })

        return this
    }

    /**
     * [saveResponse description]
     *
     * @param  {[type]} response [description]
     * @return {[type]}          [description]
     */
    saveResponse( response ) {
        const { data, status } = response

        this.data = data
        this.status = status
        this.errors = this.errors || []

        if( this.data.errors ) {
            Object.keys(this.data.errors).map( (error, index) => Vue.set(this.errors, error, this.data.errors[error][0]) )
        }
    }

    hasError( field ) {
        if( !this.errors || !this.errors[field] ) {
            return false
        }

        return {
            message: this.errors[field]
        }
    }

    reset() {

    }
}

export default Class
