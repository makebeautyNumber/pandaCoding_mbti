const main = document.querySelector('#main')
const qna = document.querySelector('#qna')
const result = document.querySelector('#result')
const endPoint = 12 // 총질문 갯수
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 

const calResult = () => {
    let result  = select.indexOf(Math.max(...select))
    console.log(select)
    console.log(result)
    return result
}

const setResult = () => {
    let answer = calResult()
    const resultName = document.querySelector('.resultname')
    resultName.innerHTML = infoList[answer].name

    let resultImg = document.createElement('img')
    const imgDiv = document.querySelector('#resultImg')
    resultImg.src = './img/image-' + String(answer) + '.png'
    resultImg.alt = answer
    resultImg.classList.add('img-fluid')
    imgDiv.appendChild(resultImg)

    const resultDesc = document.querySelector('.resultDesc') 
    resultDesc.innerHTML = infoList[answer].desc
}

const goResult = () => {
    qna.style.animation = 'fadeOut 1s'
    setTimeout(() => {
        result.style.animation = 'fadeIn 1s'
        setTimeout(() => {
            qna.style.display = 'none'
            result.style.display = 'block'
        }, 450)
    }, 450)

    setResult()
    calResult()
}


const addAnswer = (answerText, qIdx, idx) => {
    let a = document.querySelector('.answerBox')
    let answer = document.createElement('button')
    answer.classList.add('answerList')
    answer.classList.add('my-3')
    answer.classList.add('py-2')
    answer.classList.add('mx-auto')
    answer.classList.add('fadeIn')
    a.appendChild(answer)
    answer.innerHTML = answerText

    answer.addEventListener('click', () => {
        let children = document.querySelectorAll('.answerList')
        for (let i =0; i < children.length; i++) {
            children[i].disabled = true
            children[i].style.animation = 'fadeOut 0.5s'
        }
        setTimeout(() => {
            let target = qnaList[qIdx].a[idx].type
            for (let j = 0; j < target.length; j++) {
                select[Number(target[j])] += 1
            }
            for (let i =0; i < children.length; i++) {
                children[i].style.display = 'none'
            }
            goNext(++qIdx)
        }, 450)
    })
}

const goNext = (qIdx) => {
    if (qIdx === endPoint) {
        goResult()
        return 
    }
    let q = document.querySelector('.qBox')
    q.innerHTML = qnaList[qIdx].q
    for ( let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i)
    }
    let status = document.querySelector('.statusBar')
    status.style.width = (100/endPoint) * (qIdx+1) + '%'
}

const begin = () => {
    main.style.animation = 'fadeOut 1s'
    setTimeout(() => {
        qna.style.animation = 'fadeIn 1s'
        setTimeout(() => {
            main.style.display = 'none'
            qna.style.display = 'block'
        }, 450)
    }, 450)
    let qIdx = 0
    goNext(qIdx)
}
