function _x(location, x) {
    switch (location) {

        case 'MD': 
        case 'CT': 
        case 'NJ': 
        case 'NY': 
        case 'DC': 
        case 'ME': 
        case 'MA': 
        case 'RI': 
            x -= 35; break;

        case 'VT':
        case 'NH':
        case 'ME':
            x -= 50;
            break;
        case 'MT':
            x += 0;
            break;

         
        case 'AZ': 
        case 'HI': 
        case 'FL':
                x += 80; break;

        case 'AR':
        case 'TX':
        case 'IL':
        case 'SC':
        case 'GA':
        case 'MS':
        case 'CO':
        case 'OR':
        
        case 'NM':
            x += 50; break;
        
        case 'OK':
            x += 90; break;
        
        case 'NC':
            x += 100; break;

        case 'AK':
            x += 140; break;

        case 'AL':
        case 'LA':
            x += 30; break;
            
        case 'NE':
        case 'CA':
        case 'NV':
        case 'MD': 
            x += 50; break;

        case 'NJ':
            x += 20; break;

        
        case 'IN':
        case 'UT':
        case 'PA':
        case 'MA':
            x -= 30;
            break;
    }
    return x;
}

function _y(location, y) {
    switch (location) {

        case 'NY':
            y += 75; break;

        case 'MD': 
        case 'CT': 
        case 'NJ': 
        case 'DC': 
        case 'ME': 
        case 'MA': 
        case 'RI': 
            y += 55; break;


        case 'MT':
        case 'IN': 
            y += 65; break;

        case 'ID':
        case 'MI':
            y += 100; break;
            
        case 'OH':
        case 'KS':
        case 'SD':
        case 'IA':
        case 'MO':
        case 'IL': 
        case 'WV':
        case 'VA':
        case 'DE':
        case 'PA':
        case 'VT':
        case 'NH':
        
        case 'WI':
        case 'MN':
        case 'ND':
        case 'MT':
        case 'WA':
        case 'ME':
        case 'WI':
        case 'WY':
        case 'OR':
        
        case 'CA':
        
            y += 55; break;

        case 'FL':
            y -= 40; break;

        case 'AK':
            y -= 0; break;

        case 'LA':
            y -= 20; 
        case 'TN':
        case 'KY':
            y += 40; break;

        case 'CO':
        case 'MA':
        case 'NM':
        case 'NE':
            y += 20;
            break;
        default:
            y -= 30;
            break;

    }
    return y;
}


function _labelPos(path, d) {

    var r = path.centroid(d);
 
    var maplocation = $('maplocation').get('value');

    switch (d.properties.abbr) {
        case "PA": r[0] += 5; r[1] += 0; break;
        case "VA": r[0] += 5; r[1] += 5; break;
        case "LA": r[0] += 2; r[1] += 15; break;
        case "FL": r[0] += 10; r[1] += 0; break;
        case "MI": r[0] += 8; r[1] += 8; break;
        case "KY": r[0] += 4; r[1] += 5; break;
        case "TN": r[0] -= 0; r[1] += 4; break;
        case "CA": r[0] -=5; r[1] -= 0; break;
        case "VT": r[0] -= 4; r[1] -= 6; break;
        case "NY": r[0] += 6; r[1] -= 0;break;

        case "SC":
        case "OH": r[1] += 3; break;
        case "IN": r[0] += 2; break;
        case "IL": r[0] += 2; r[1] += 10; break;
             
        case "HI": r[0] -= 20; r[1] += 20; break;

        case "BC": r[0] += 1; r[1] += 20; break;

        case "AS":
        case "GU":
        case "VI": r[0] += 20; r[1] += 0; break;

        case "PR": r[0] += 1; r[1] += 4; break;
        case "MP": r[0] += 22; r[1] += 28; break;
        case "ID": r[0] += 0; r[1] += 15; break;


        case "NH": r[0] += 25; r[1] += 9; break;
        case "CT": r[0] += 25; r[1] += 15; break;
        case "DC": r[0] += 50; r[1] += 35; break;
        case "DE": r[0] += 25; r[1] += 10; break;
        case "MA": r[0] += 0; r[1] += 1; break;
        case "MD": r[0] += 45; r[1] += 25; break;
        case "NJ": r[0] += 30; r[1] += 10; break;
        case "RI": r[0] += 25; r[1] += 8; break;


    }


    return r;
}

function _labelIsExt(path, d) {

    var r = _labelPos(path, d);

    switch (d.properties.abbr) {
        
        case "NH": r[0] -= 25; r[1] -= 9; break;
        case "CT": r[0] -= 25; r[1] -= 15; break;
        case "DC": r[0] -= 50; r[1] -= 35; break;
        case "DE": r[0] -= 25; r[1] -= 10; break;
        case "MD": r[0] -= 45; r[1] -= 25; break;
        case "NJ": r[0] -= 30; r[1] -= 10; break;
        case "RI": r[0] -= 25; r[1] -= 8; break;
        
        
        case "HI": r[0] += 20; r[1] -= 20; break;

        case "MP": r[0] -= 22; r[1] -= 28; break;
        
        case "AS":
        case "GU":
        case "VI": r[0] -= 20; r[1] += 0; break;
   

        default:
            return;
    }

    return r;
}