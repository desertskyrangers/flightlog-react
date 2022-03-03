class Times {

	toHourMinSec(seconds) {
		let duration = seconds

		let ss = duration % 60
		duration = Math.floor(duration / 60)
		let mm = duration % 60
		duration = Math.floor(duration / 60)
		let hh = duration

		return String(hh).padStart(2, '0') + ":" + String(mm).padStart(2, '0') + ":" + String(ss).padStart(2, '0')
	}

	toHourMin(seconds) {
		let duration = Math.floor(seconds / 60)

		let mm = duration % 60
		duration = Math.floor(duration / 60)
		let hh = duration

		return String(hh).padStart(2, '0') + ":" + String(mm).padStart(2, '0')
	}

	toMinSec(seconds) {
		let duration = seconds

		let ss = duration % 60
		duration = Math.floor(duration / 60)
		let mm = duration

		return String(mm).padStart(2, '0') + ":" + String(ss).padStart(2, '0')
	}

}

const instance = new Times()
Object.freeze(instance)
export default instance
