class Times {

	toHourMinSec(milliseconds) {
		let duration = Math.floor(milliseconds / 1000)

		let ss = duration % 60
		duration = Math.floor(duration / 60)
		let mm = duration % 60
		duration = Math.floor(duration / 60)
		let hh = duration

		return String(hh).padStart(2, '0') + ":" + String(mm).padStart(2, '0') + ":" + String(ss).padStart(2, '0')
	}

	toHourMin(milliseconds) {
		let duration = Math.floor(milliseconds / 60000)

		let mm = duration % 60
		duration = Math.floor(duration / 60)
		let hh = duration

		return String(hh).padStart(2, '0') + ":" + String(mm).padStart(2, '0')
	}

}

const instance = new Times()
Object.freeze(instance)
export default instance
