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
        let response = await axios.post(url, this)

        this.parseRequest( response )

        return this
    }

    /**
     * [patch description]
     *
     * @param  {[type]}  url [description]
     * @return {Promise}     [description]
     */
    async patch( url ) {
        let response = await axios.patch(url, this)

        this.parseRequest( response )

        return this
    }

    /**
     * [get description]
     *
     * @param  {[type]}  url [description]
     * @return {Promise}     [description]
     */
    async get( url ) {
        let response = await axios.get(url, this)

        this.parseRequest( response )

        return this
    }

    /**
     * [parseRequest description]
     *
     * @param  {[type]} response [description]
     * @return {[type]}          [description]
     */
    parseRequest( response ) {
        const { data, status } = response

        this.data = data
        this.status = status
        this.errors = []

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
