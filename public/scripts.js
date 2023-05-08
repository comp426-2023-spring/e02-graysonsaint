// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

function play() {
    var rps = document.getElementById('rps').checked;
    var rpsls = document.getElementById('rpsls').checked;
    var opp = document.getElementById('opp').checked;
    var shot;
    var shots = document.getElementsByName('shot-choice');
    for (var i = 0; i < shots.length; i++) {
        if (shots[i].checked) {
            shot = shots[i].value;
            break;
        }
    }

    if (!rps && !rpsls) {
        document.getElementById('result').innerText = 'Choose a game mode.';
    } else if (rps && !opp) {
        //document.getElementById('result').innerText = 'RPS';
        fetch(`/app/rps/play`)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                document.getElementById('result').innerText = `Shot: ${json.player}`;
            })
    } else if (rpsls && !opp) {
        //document.getElementById('result').innerText = 'RPSLS';
        
        fetch(`/app/rpsls/play`)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                document.getElementById('result').innerText = `Shot: ${json.player}`;
            })
    } else if (rps && opp) {
        fetch(`/app/rps/play/${shot}`)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                document.getElementById('result').innerText = `Player: ${json.player}\nOpponent: ${json.opponent}\nResult: ${json.result}`;
            })
    } else {
        fetch(`/app/rpsls/play/${shot}`)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                document.getElementById('result').innerText = `Player: ${json.player}\nOpponent: ${json.opponent}\nResult: ${json.result}`;
            })
    }
    document.getElementById('results').className = 'show';
    
}

function showShots() {
    var rps = document.getElementById('rps').checked;
    var rpsls = document.getElementById('rpsls').checked;
    var opp = document.getElementById('opp').checked;
    if(opp) {
        if (rps) {
            document.getElementById('rpsshots').className = 'show';
            document.getElementById('rpslsshots').className = 'hide';
        } else if (rpsls) {
            document.getElementById('rpsshots').className = 'show';
            document.getElementById('rpslsshots').className = 'show';
        }
    } else {
        document.getElementById('rpsshots').className = 'hide';
        document.getElementById('rpslsshots').className = 'hide';
    }
}

function restart() {
    document.getElementById('results').className = 'hide';
    document.getElementById('rpsshots').className = 'hide';
    document.getElementById('rpslsshots').className = 'hide';
    document.getElementById('rps').checked = true;
    document.getElementById('opp').checked = false;
}